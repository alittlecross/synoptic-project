const assert = require('assert')
const { restrictedQuiz, viewQuiz, editQuiz } = require('../support')

describe('Quiz-id View', () => {
  context('Elements', () => {
    it('should have the right title', () => {
      restrictedQuiz()
      const title = browser.getTitle()

      assert.strictEqual('Quiz - Geography', title)
    })

    it('should have the right main header', () => {
      const mainHeader = $$('h1#main-header')

      assert.strictEqual(1, mainHeader.length)
      assert.strictEqual('Blue Book', mainHeader[0].getText())
    })

    it('should have the a logo', () => {
      const logo = $$('img#logo')

      assert.strictEqual(1, logo.length)
    })

    it(`should have a 'Log Out' link`, () => {
      const link = $$('a[href="/log-out"]')

      assert.strictEqual(1, link.length)
      assert.strictEqual('Log Out', link[0].getText())
    })

    it(`should have a 'Back' link`, () => {
      const link = $$('a[href="/list"]')

      assert.strictEqual(1, link.length)
      assert.strictEqual('Back', link[0].getText())
    })

    it(`should have the right sub-header`, () => {
      const subHeader = $$('h2#sub-header')

      assert.strictEqual(1, subHeader.length)
      assert.strictEqual('Geography', subHeader[0].getText())
    })

    it(`should have the correct questions`, () => {
      const questions = $$('li.question')

      assert.strictEqual(2, questions.length)
      assert.strictEqual('Bulgaria is in which continent?', questions[0].getText())
      assert.strictEqual('Bolivia is in which continent?', questions[1].getText())
    })

    it(`should have the correct answers for each question`, () => {
      const answers = $$('label[for^="answer-"')

      assert.strictEqual(4, answers.length)
      assert.strictEqual('Europe', answers[0].getText())
      assert.strictEqual('South America', answers[1].getText())
      assert.strictEqual('Europe', answers[2].getText())
      assert.strictEqual('South America', answers[3].getText())
    })

    it(`should not have an 'Edit' link (restricted access)`, () => {
      const link = $$('a[href^="/edit-"')

      assert.strictEqual(0, link.length)
    })

    it(`should not have 'Show correct answer' buttons (restricted access)`, () => {
      const buttons = $$('button[class="show"')

      assert.strictEqual(0, buttons.length)
    })

    it(`should not have an 'Edit' link (view access)`, () => {
      viewQuiz()
      const link = $$('a[href^="/edit-"')

      assert.strictEqual(0, link.length)
    })

    it(`should have 'Show correct answer' buttons (view access)`, () => {
      const buttons = $$('button[class="show"')

      assert.strictEqual(2, buttons.length)
    })

    it(`should not have an 'Edit' link (edit access)`, () => {
      editQuiz()
      const link = $$('a[href^="/edit-"')

      assert.strictEqual(1, link.length)
    })

    it(`should have 'Show correct answer' buttons (edit access)`, () => {
      const buttons = $$('button[class="show"')

      assert.strictEqual(2, buttons.length)
    })
  })

  context('Functionality', () => {
    it(`the 'Log Out' link should return to the use to the 'Log In' page`, () => {
      restrictedQuiz()
      const link = $$('a[href="/log-out"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`the 'Back' links should navigate to back to the 'List' page`, () => {
      restrictedQuiz()
      const link = $$('a[href="/list"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`clicking an answer should change it's color`, () => {
      restrictedQuiz()
      const answer = $$('label[for="answer-1"')
      const before = answer[0].getCSSProperty('color')
      answer[0].click()
      const after = answer[0].getCSSProperty('color')

      assert.strictEqual('#777777', before.parsed.hex)
      assert.strictEqual('#00ff88', after.parsed.hex)
    })

    it(`clicking 'Show correct answer' should change the color of the correct answer and 'Show' to 'Hide'`, () => {
      viewQuiz()
      const answer = $$('label[for="answer-1"')
      const before = answer[0].getCSSProperty('color')
      const show = $$('button[class="show"] span')
      show[0].click()
      const after = answer[0].getCSSProperty('color')

      assert.strictEqual('Hide', show[0].getText())
      assert.strictEqual('#777777', before.parsed.hex)
      assert.strictEqual('#ffbb00', after.parsed.hex)
    })

    it(`clicking 'Hide correct answer' should change the color of the correct answer and 'Hide' to 'Show'`, () => {
      const answer = $$('label[for="answer-1"')
      const before = answer[0].getCSSProperty('color')
      const hide = $$('button[class="show"] span')
      hide[0].click()
      const after = answer[0].getCSSProperty('color')

      assert.strictEqual('Show', hide[0].getText())
      assert.strictEqual('#ffbb00', before.parsed.hex)
      assert.strictEqual('#777777', after.parsed.hex)
    })

    it(`the 'Edit' link should navigate to the 'Edit-id' page`, () => {
      editQuiz()
      const link = $$('a[href="/edit-1"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/edit-1', url)
    })
  })
})
