module.exports.dbLogInOne = {
  rowCount: 1,
  rows: [
    { id: 1,
      username: 'person@email.com',
      password: '$2b$10$2mQcfZHsglfEFQQ8lqJnVefPyVvFlciCsVucezl5SXBgYvdhlCppW',
      createdat: '2005-07-01T12:00:00',
      permissionid: 3,
      permission: 'restricted' }
  ]
}

module.exports.dbLogInTwo = {
  rowCount: 0,
  rows: []
}

module.exports.dbGetAll = {
  rowCount: 2,
  rows: [
    { quizid: 1,
      name: 'Quiz One' },
    { quizid: 2,
      name: 'Quiz Two' }
  ]
}

module.exports.dbGetOne = {
  rowCount: 3,
  rows: [
    { kind: 'quiz',
      name: 'Quiz One',
      quizid: 1,
      question: '',
      questionid: 1,
      answer: '',
      answerid: 1,
      correct: false },
    { kind: 'question',
      name: '',
      quizid: 1,
      question: 'Question One?',
      questionid: 1,
      answer: '',
      answerid: 1,
      correct: false },
    { kind: 'answer',
      quiz: '',
      quizid: 1,
      question: '',
      questionid: 1,
      answer: 'Answer One',
      answerid: 1,
      correct: true }
  ]
}
