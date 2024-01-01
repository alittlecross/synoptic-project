import DatabaseQuizes from "../services/quizes.js";
import DatabaseQuestions from "../services/questions.js";
import DatabaseAnswers from "../services/answers.js";

class Add {
  static async quiz(body) {
    const { newQuizName } = body;
    if (newQuizName) {
      const result = await DatabaseQuizes.addOne(newQuizName);

      const quizId = result.rows[0].id;
      await Add.questions(body, quizId);
    }
  }

  static async questions(body, quizId) {
    const allKeys = Object.keys(body);
    const newQuestionKeys = allKeys.filter(
      (key) => key.match(/newQuestion/) && key.match(/-/g).length === 1
    );
    const string = [];

    newQuestionKeys.forEach((key) => {
      let bodyQuestion = body[key];
      bodyQuestion = bodyQuestion.replace(/'/, `''`);
      string.push(`'${bodyQuestion}', '${quizId}'`);
    });

    if (string.length) {
      const results = await DatabaseQuestions.addMany(string.join("), ("));
      const newQuestionIds = results.rows;

      await Add.answers(newQuestionKeys, allKeys, body, newQuestionIds);
    }
  }

  static async answers(questionKeys, allKeys, body, questionIds) {
    const string = [];

    questionKeys.forEach((_key, index) => {
      const regExp = new RegExp(_key);
      const correctAnswerKey = allKeys.filter(
        (key) => key.match(regExp) && key.match(/correct/)
      );
      const correctAnswer = body[correctAnswerKey];
      const answerKeys = allKeys.filter(
        (key) =>
          key.match(regExp) && !key.match(/correct/) && key.match(/newAnswer/)
      );

      answerKeys.forEach((key) => {
        let bodyAnswer = body[key];
        bodyAnswer = bodyAnswer.replace(/'/, `''`);
        string.push(
          `'${bodyAnswer}', ${correctAnswer === key}, '${
            questionIds[index].id
          }'`
        );
      });
    });

    if (string.length) {
      await DatabaseAnswers.addMany(string.join("), ("));
    }
  }
}

export default Add;
