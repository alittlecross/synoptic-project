class Question {
  constructor (data) {
    this.id = data.questionid
    this.question = data.question
    this.answers = []
  }
}

module.exports = Question
