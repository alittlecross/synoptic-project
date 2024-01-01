export const dbLogInOne = {
  rowCount: 1,
  rows: [
    {
      id: 1,
      username: "person@email.com",
      password: "$2b$10$2mQcfZHsglfEFQQ8lqJnVefPyVvFlciCsVucezl5SXBgYvdhlCppW",
      createdat: "2005-07-01T12:00:00",
      permissionid: 3,
      permission: "restricted",
    },
  ],
};

export const dbLogInTwo = {
  rowCount: 0,
  rows: [],
};

export const dbGetAll = {
  rowCount: 2,
  rows: [
    { quizid: 1, name: "Quiz One" },
    { quizid: 2, name: "Quiz Two" },
  ],
};

export const dbGetOne = {
  rowCount: 3,
  rows: [
    {
      kind: "quiz",
      name: "Quiz One",
      quizid: 1,
      question: "",
      questionid: 1,
      answer: "",
      answerid: 1,
      correct: false,
    },
    {
      kind: "question",
      name: "",
      quizid: 1,
      question: "Question One?",
      questionid: 1,
      answer: "",
      answerid: 1,
      correct: false,
    },
    {
      kind: "answer",
      quiz: "",
      quizid: 1,
      question: "",
      questionid: 1,
      answer: "Answer One",
      answerid: 1,
      correct: true,
    },
  ],
};

export const dbAdd = {
  rowCount: 1,
  rows: [{ id: 1 }],
};

export const body = {
  newQuizName: "Quiz One",
  "newQuestion-1": "Question One?",
  "newQuestion-1-newAnswer-1": "Question One Answer One",
  "newQuestion-1-newAnswer-2": "Question One Answer Two",
  "newQuestion-1-correct-answer": "newQuestion-1-newAnswer-1",
  "newQuestion-2": "Question One?",
  "newQuestion-2-newAnswer-1": "Question Two Answer One",
  "newQuestion-2-newAnswer-2": "Question Two Answer Two",
  "newQuestion-2-correct-answer": "newQuestion-2-newAnswer-1",
};

export const quiz = {
  id: 1,
  name: "Quiz One",
  questions: [
    {
      id: 1,
      question: "Question One?",
      answers: [
        {
          id: 1,
          answer: "Question One Answer One",
          correct: true,
        },
        {
          id: 2,
          answer: "Question One Answer Two",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "Question Two?",
      answers: [
        {
          id: 3,
          answer: "Question Two Answer One",
          correct: true,
        },
        {
          id: 4,
          answer: "Question Two Answer Two",
          correct: false,
        },
      ],
    },
  ],
};

export const updateDeletions = {
  quizId: "1",
  deleteQuiz: "1",
  deleteQuestions: "1",
  deleteAnswers: "1",
};

export const updateChanges = {
  oldQuizName: "Quiz Two",
  "oldQuestion-1": "Question One?",
  "oldQuestion-1-oldAnswer-1": "Question One Answer One",
  "oldQuestion-1-oldAnswer-2": "Question One Answer Two",
  "oldQuestion-1-correct-answer": "oldQuestion-1-oldAnswer-1",
  "oldQuestion-2": "Question Three?",
  "oldQuestion-2-oldAnswer-3": "Question Three Answer One",
  "oldQuestion-2-oldAnswer-4": "Question Three Answer Two",
  "oldQuestion-2-correct-answer": "oldQuestion-2-oldAnswer-4",
  quizId: "1",
  deleteQuiz: "",
  deleteQUestions: "",
  deleteAnswers: "",
};

export const updateNoChanges = {
  oldQuizName: "Quiz One",
  "oldQuestion-1": "Question One?",
  "oldQuestion-1-oldAnswer-1": "Question One Answer One",
  "oldQuestion-1-oldAnswer-2": "Question One Answer Two",
  "oldQuestion-1-correct-answer": "oldQuestion-1-oldAnswer-1",
  "oldQuestion-2": "Question Two?",
  "oldQuestion-2-oldAnswer-3": "Question Two Answer One",
  "oldQuestion-2-oldAnswer-4": "Question Two Answer Two",
  "oldQuestion-2-correct-answer": "oldQuestion-2-oldAnswer-3",
  quizId: "1",
  deleteQuiz: "",
  deleteQuestions: "",
  deleteAnswers: "",
};
