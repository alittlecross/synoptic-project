const DatabaseQuizes = require('../services/quizes')

const Question = require('./question')
const Answer = require('./answer')

class Quiz {
  constructor (data) {
    this.id = data.quizid
    this.name = data.name
    this.questions = []
  }

  static async list () {
    const results = await DatabaseQuizes.getAll()
    const quizes = results.rows.map(row => new Quiz(row))

    return quizes
  }

  static async getOne (id) {
    const result = await DatabaseQuizes.getOne(id)
    const quiz = new Quiz(result.rows.filter(row => row.kind === 'quiz')[0])
    const questions = result.rows.filter(row => row.kind === 'question')

    questions.forEach(question => quiz.questions.push(new Question(question)))

    quiz.questions.forEach(question => {
      const answers = result.rows.filter(row => (row.kind === 'answer' && row.questionid === question.id))

      answers.forEach(answer => question.answers.push(new Answer(answer)))
    })

    return quiz
  }
}

module.exports = Quiz
