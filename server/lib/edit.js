const DatabaseQuizes = require('../services/quizes')
const DatabaseQuestions = require('../services/questions')
const DatabaseAnswers = require('../services/answers')

const Add = require('./add')

class Edit {
  static async quiz (body, quiz) {
    const deleteQuiz = body['delete-quiz']
    const quizId = quiz.id

    if (deleteQuiz) {
      await DatabaseQuizes.deleteOne(deleteQuiz)
    } else {
      const bodyName = body['quiz-name']
      const quizName = quiz.name

      if (bodyName !== quizName) {
        await DatabaseQuizes.updateOne(bodyName, quizId)
      }

      Edit.questions(body, quiz)
    }
  }

  static async questions (body, quiz) {
    const deleteQuestions = body['delete-questions']

    if (deleteQuestions) {
      await DatabaseQuestions.deleteMany(deleteQuestions)
    }

    const string = []
    const allKeys = Object.keys(body)
    const questionKeys = allKeys.filter(key => key.match(/old/) && key.match(/-/g).length === 1 && !key.match(/delete/))

    questionKeys.forEach(key => {
      const questionId = parseInt(key.split('-')[1])
      const questionIndex = quiz.questions.findIndex(element => element.id === questionId)
      const quizQuestion = quiz.questions[questionIndex].question

      let bodyQuestion = body[key]
      if (bodyQuestion !== quizQuestion) {
        bodyQuestion = bodyQuestion.replace(/'/, `''`)
        string.push(`'${questionId}', '${bodyQuestion}', '0'`)
      }
    })

    if (string.length) {
      await DatabaseQuestions.updateMany(string.join('), ('))
    }

    Add.questions(body, quiz.id)

    Edit.answers(allKeys, body, quiz)
  }

  static async answers (allKeys, body, quiz) {
    const deleteAnswers = body['delete-answers']

    if (deleteAnswers) {
      await DatabaseAnswers.deleteMany(deleteAnswers)
    }

    const string = []

    const correctAnswerKeys = allKeys.filter(key => key.match(/old/) && key.match(/correct/))
    const correctAnswerValues = correctAnswerKeys.map(key => body[key])
    const answerKeys = allKeys.filter(key => key.match(/old/) && !key.match(/correct/) && key.match(/answer/) && !key.match(/delete/))

    answerKeys.forEach(key => {
      const questionId = parseInt(key.split('-')[1])
      const answerId = parseInt(key.split('-')[3])
      const questionIndex = quiz.questions.findIndex(element => element.id === questionId)
      const answerIndex = quiz.questions[questionIndex].answers.findIndex(element => element.id === answerId)
      const quizAnswer = quiz.questions[questionIndex].answers[answerIndex].answer
      const quizCorrect = quiz.questions[questionIndex].answers[answerIndex].correct
      const bodyCorrect = correctAnswerValues.includes(key)

      let bodyAnswer = body[key]
      if (bodyAnswer !== quizAnswer || bodyCorrect !== quizCorrect) {
        bodyAnswer = bodyAnswer.replace(/'/, `''`)
        string.push(`'${answerId}', '${bodyAnswer}', '${bodyCorrect}', '0'`)
      }
    })

    if (string.length) {
      await DatabaseAnswers.updateMany(string.join('), ('))
    }
  }
}

module.exports = Edit
