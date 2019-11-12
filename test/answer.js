const expect = require('chai').expect
const { dbGetOne } = require('./support')

const Answer = require('../server/lib/answer')

describe('class Answer', () => {
  describe('.constructor', () => {
    it('should create an Answer object', async () => {
      const result = new Answer(dbGetOne.rows[2])

      expect(result instanceof Answer).equal(true)
      expect(result.id).equal(1)
      expect(result.answer).equal('Answer One')
      expect(result.correct).equal(true)
    })
  })
})
