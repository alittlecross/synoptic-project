class Question {
  constructor(data) {
    this.id = data.questionid;
    this.question = data.question;
    this.answers = [];
  }
}

export default Question;
