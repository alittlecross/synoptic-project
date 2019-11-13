const DatabaseQuizes = require('../services/quizes')
const DatabaseQuestions = require('../services/questions')
const DatabaseAnswers = require('../services/answers')

class Add {
  static async quiz (body) {
    const quizName = body['quiz-name']
    if (quizName) {
      const result = await DatabaseQuizes.addOne(quizName)

      const quizId = result.rows[0].id
      Add.questions(body, quizId)
    }
  }

  static async questions (body, quizId) {
    const allKeys = Object.keys(body)
    const questionKeys = allKeys.filter(key => key.match(/question/) && key.match(/-/g).length === 1)
    const string = []

    questionKeys.forEach(key => {
      let bodyQuestion = body[key]
      bodyQuestion = bodyQuestion.replace(/'/, `''`)
      string.push(`'${bodyQuestion}', '${quizId}'`)
    })

    if (string.length) {
      const results = await DatabaseQuestions.addMany(string.join('), ('))
      const questionIds = results.rows

      Add.answers(questionKeys, allKeys, body, questionIds)
    }
  }

  static async answers (questionKeys, allKeys, body, questionIds) {
    const string = []

    questionKeys.forEach((key, index) => {
      const regExp = new RegExp(key)
      const correctAnswerKey = allKeys.filter(key => key.match(regExp) && key.match(/correct/))
      const correctAnswer = body[correctAnswerKey]
      const answerKeys = allKeys.filter(key => key.match(regExp) && !key.match(/correct/) && key.match(/answer/))

      answerKeys.forEach(key => {
        let bodyAnswer = body[key]
        bodyAnswer = bodyAnswer.replace(/'/, `''`)
        string.push(`'${bodyAnswer}', ${correctAnswer === key}, '${questionIds[index].id}'`)
      })
    })

    if (string.length) {
      await DatabaseAnswers.addMany(string.join('), ('))
    }
  }
}

module.exports = Add
