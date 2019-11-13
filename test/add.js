const expect = require('chai').expect
const { dbAdd, body } = require('./support')

const Add = require('../server/lib/add')
const DatabaseQuizes = require('../server/services/quizes')
const DatabaseQuestions = require('../server/services/questions')
const DatabaseAnswers = require('../server/services/answers')

describe('class Add', () => {
  let sandbox
  let quizesAddOne
  let questionsAddMany
  let answersAddMany

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
    quizesAddOne = sandbox.stub(DatabaseQuizes, 'addOne').returns(dbAdd)
    questionsAddMany = sandbox.stub(DatabaseQuestions, 'addMany').returns(dbAdd)
    answersAddMany = sandbox.stub(DatabaseAnswers, 'addMany')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.quiz', () => {
    it('should add a quiz to the database', async () => {
      sandbox.stub(Add, 'questions')

      await Add.quiz(body)

      expect(quizesAddOne.callCount).equal(1)
    })

    it('should not add a quiz to the database (no quiz-name)', async () => {
      sandbox.stub(Add, 'questions')

      await Add.quiz({})

      expect(quizesAddOne.callCount).equal(0)
    })
  })

  describe('.questions', () => {
    it('should add a question(s) to the database', async () => {
      sandbox.stub(Add, 'answers')

      await Add.questions(body, 1)

      expect(questionsAddMany.callCount).equal(1)
    })

    it('should not add a question(s) to the database (no questions)', async () => {
      sandbox.stub(Add, 'answers')

      await Add.questions({}, 1)

      expect(questionsAddMany.callCount).equal(0)
    })
  })

  describe('.answers', () => {
    it('should add an answer(s) to the database', async () => {
      await Add.answers(['question-1'], ['quiz-name', 'question-1', 'question-1-answer-1', 'question-1-correct-answer'], body, ['1'])

      expect(answersAddMany.callCount).equal(1)
    })

    it('should not add an answer(s) to the database (no answers)', async () => {
      await Add.answers(['question-1'], ['quiz-name', 'question-1'], {}, ['1'])

      expect(answersAddMany.callCount).equal(0)
    })
  })
})
