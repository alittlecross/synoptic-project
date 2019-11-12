const expect = require('chai').expect
const { dbGetOne } = require('./support')

const Question = require('../server/lib/question')

describe('class Question', () => {
  describe('.constructor', () => {
    it('should create a Question object', async () => {
      const result = new Question(dbGetOne.rows[1])

      expect(result instanceof Question).equal(true)
      expect(result.id).equal(1)
      expect(result.question).equal('Question One?')
      expect(result.answers).to.be.an('array')
    })
  })
})
