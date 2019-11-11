const expect = require('chai').expect
const { dbGetAll } = require('./support')

const Quiz = require('../server/lib/quiz')
const DatabaseQuizes = require('../server/services/quizes')

describe('class Quiz', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('should create a Quiz object', async () => {
      const result = new Quiz(dbGetAll.rows[0])

      expect(result instanceof Quiz).equal(true)
      expect(result.id).equal(1)
      expect(result.name).equal('Quiz One')
    })
  })

  describe('.list', () => {
    it('should query the database for all quizes', async () => {
      const getAll = sandbox.stub(DatabaseQuizes, 'getAll').returns(dbGetAll)

      await Quiz.list()

      expect(getAll.callCount).equal(1)
    })

    it('should return an array of Quiz objects', async () => {
      sandbox.stub(DatabaseQuizes, 'getAll').returns(dbGetAll)

      const result = await Quiz.list()

      expect(result).to.be.an('array')
      expect(result[0] instanceof Quiz).equal(true)
    })
  })
})
