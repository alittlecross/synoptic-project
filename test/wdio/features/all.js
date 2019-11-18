const assert = require('assert')
const { restrictedLogIn, viewLogIn, editLogIn } = require('../support')

describe('All Views', () => {
  context('No Access', () => {
    it(`allows the user to visit '/'`, () => {
      browser.url('/')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/log-in'`, () => {
      browser.url('/')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/list'`, () => {
      browser.url('/list')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/log-out'`, () => {
      browser.url('/log-out')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/quiz-1'`, () => {
      browser.url('/quiz-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/question-1-correct-answer'`, () => {
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/add'`, () => {
      browser.url('/add')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/edit-1'`, () => {
      browser.url('/edit-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })
  })

  context('Restricted Access', () => {
    it(`allows the user to visit '/'`, () => {
      restrictedLogIn()
      browser.url('/')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/log-in'`, () => {
      restrictedLogIn()
      browser.url('/log-in')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/list'`, () => {
      browser.url('/list')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/log-out'`, () => {
      browser.url('/log-out')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`allows the user to visit '/quiz-1'`, () => {
      restrictedLogIn()
      browser.url('/quiz-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/quiz-1', url)
    })

    it(`does not allow the user to visit '/question-1-correct-answer'`, () => {
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`does not allow the user to visit '/add'`, () => {
      browser.url('/add')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`does not allow the user to visit '/edit-1'`, () => {
      browser.url('/edit-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })
  })

  context('View Access', () => {
    it(`allows the user to visit '/'`, () => {
      viewLogIn()
      browser.url('/')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit /log-in`, () => {
      viewLogIn()
      browser.url('/log-in')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/list'`, () => {
      browser.url('/list')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/log-out'`, () => {
      browser.url('/log-out')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/question-1-correct-answer' from the list page`, () => {
      viewLogIn()
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/quiz-1'`, () => {
      browser.url('/quiz-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/quiz-1', url)
    })

    it(`gives the correct response when visiting '/question-1-correct-answer' from the quiz-1 page`, () => {
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()
      const pre = $$('pre')

      assert.strictEqual('http://localhost:3000/question-1-correct-answer', url)
      assert.strictEqual('{"id":1}', pre[0].getText())
    })

    it(`gives the correct response when visiting '/question-3-correct-answer' from the quiz-1 page`, () => {
      browser.url('/question-3-correct-answer')
      const url = browser.getUrl()
      const pre = $$('pre')

      assert.strictEqual('http://localhost:3000/question-3-correct-answer', url)
      assert.strictEqual('{"warning":"this route does not relate to the currently cached quiz"}', pre[0].getText())
    })

    it(`does not allow the user to visit '/add'`, () => {
      browser.url('/add')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`does not allow the user to visit '/edit-1'`, () => {
      browser.url('/edit-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })
  })

  context('Edit Access', () => {
    it(`allows the user to visit '/'`, () => {
      editLogIn()
      browser.url('/')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit /log-in`, () => {
      editLogIn()
      browser.url('/log-in')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/list'`, () => {
      browser.url('/list')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/log-out'`, () => {
      browser.url('/log-out')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`does not allow the user to visit '/question-1-correct-answer' from the list page`, () => {
      editLogIn()
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`allows the user to visit '/quiz-1'`, () => {
      browser.url('/quiz-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/quiz-1', url)
    })

    it(`gives the correct response when visiting '/question-1-correct-answer' from the quiz-1 page`, () => {
      browser.url('/question-1-correct-answer')
      const url = browser.getUrl()
      const pre = $$('pre')

      assert.strictEqual('http://localhost:3000/question-1-correct-answer', url)
      assert.strictEqual('{"id":1}', pre[0].getText())
    })

    it(`gives the correct response when visiting '/question-3-correct-answer' from the quiz-1 page`, () => {
      browser.url('/question-3-correct-answer')
      const url = browser.getUrl()
      const pre = $$('pre')

      assert.strictEqual('http://localhost:3000/question-3-correct-answer', url)
      assert.strictEqual('{"warning":"this route does not relate to the currently cached quiz"}', pre[0].getText())
    })

    it(`allows the user to visit '/add'`, () => {
      browser.url('/add')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/add', url)
    })

    it(`allows the user to visit '/edit-1'`, () => {
      browser.url('/edit-1')
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/edit-1', url)
    })
  })
})
