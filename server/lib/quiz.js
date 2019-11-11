const DatabaseQuizes = require('../services/quizes')

class Quiz {
  constructor (data) {
    this.id = data.quizid
    this.name = data.name
  }

  static async list () {
    const results = await DatabaseQuizes.getAll()
    const quizes = results.rows.map(row => new Quiz(row))

    return quizes
  }
}

module.exports = Quiz
