const expect = require('chai').expect
const { dbLogInOne, dbLogInTwo } = require('./support')

const LogIn = require('../server/lib/log-in')
const DatabasePeople = require('../server/services/people')

describe('class LogIn', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('should create a LogIn object', () => {
      const result = new LogIn()

      expect(result instanceof LogIn).equal(true)
      expect(result.success).equal(false)
      expect(result.user.id).equal(0)
      expect(result.user.permission).equal('')
    })
  })

  describe('.authenticate', () => {
    it('should query the database for a person with the given username', async () => {
      const authenticate = sandbox.stub(DatabasePeople, 'authenticate').returns(dbLogInTwo)
      await LogIn.authenticate({
        username: 'person@email.com',
        password: 'password'
      })

      expect(authenticate.callCount).equal(1)
    })

    it('should return a LogIn object (success)', async () => {
      sandbox.stub(DatabasePeople, 'authenticate').returns(dbLogInOne)
      const result = await LogIn.authenticate({
        username: 'person@email.com',
        password: 'password'
      })

      expect(result instanceof LogIn).equal(true)
      expect(result.success).equal(true)
      expect(result.user.id).equal(1)
      expect(result.user.permission).equal('restricted')
    })

    it('should return a LogIn object (incorrect username)', async () => {
      sandbox.stub(DatabasePeople, 'authenticate').returns(dbLogInTwo)
      const result = await LogIn.authenticate({
        username: 'person@email.co.uk',
        password: 'password'
      })

      expect(result instanceof LogIn).equal(true)
      expect(result.success).equal(false)
      expect(result.user.id).equal(0)
      expect(result.user.permission).equal('')
    })

    it('should return a LogIn object (incorrect password)', async () => {
      sandbox.stub(DatabasePeople, 'authenticate').returns(dbLogInOne)
      const result = await LogIn.authenticate({
        username: 'person@email.com',
        password: 'smith123'
      })

      expect(result instanceof LogIn).equal(true)
      expect(result.success).equal(false)
      expect(result.user.id).equal(0)
      expect(result.user.permission).equal('')
    })
  })
})
