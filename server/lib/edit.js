const DatabaseQuizes = require('../services/quizes')
const DatabaseQuestions = require('../services/questions')
const DatabaseAnswers = require('../services/answers')

const Add = require('./add')

class Edit {
  static async quiz (body, quiz) {
    const deleteQuiz = body['deleteQuiz']
    const quizId = quiz.id

    if (deleteQuiz) {
      await DatabaseQuizes.deleteOne(deleteQuiz)
      return true
    } else {
      const bodyName = body['oldQuizName']
      const quizName = quiz.name

      if (bodyName !== quizName) {
        await DatabaseQuizes.updateOne(bodyName, quizId)
      }

      await Edit.questions(body, quiz)
      return false
    }
  }

  static async questions (body, quiz) {
    const deleteQuestions = body['deleteQuestions']

    if (deleteQuestions) {
      await DatabaseQuestions.deleteMany(deleteQuestions)
    }

    const allKeys = Object.keys(body)
    const oldQuestionKeys = allKeys.filter(key => key.match(/oldQuestion/) && key.match(/-/g).length === 1)
    const oldQuestionIds = oldQuestionKeys.map(key => { return { id: parseInt(key.split('-')[1]) } })
    const string = []

    oldQuestionKeys.forEach(key => {
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

    await Add.questions(body, quiz.id)

    await Add.answers(oldQuestionKeys, allKeys, body, oldQuestionIds)

    await Edit.answers(allKeys, body, quiz)
  }

  static async answers (allKeys, body, quiz) {
    const deleteAnswers = body['deleteAnswers']

    if (deleteAnswers) {
      await DatabaseAnswers.deleteMany(deleteAnswers)
    }

    const string = []

    const correctAnswerKeys = allKeys.filter(key => key.match(/oldQuestion/) && key.match(/correct/))
    const correctAnswerValues = correctAnswerKeys.map(key => body[key])
    const answerKeys = allKeys.filter(key => key.match(/oldQuestion/) && !key.match(/correct/) && key.match(/oldAnswer/))

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
