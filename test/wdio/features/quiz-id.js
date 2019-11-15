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
      const getText = mainHeader[0].getText()

      assert.strictEqual(1, mainHeader.length)
      assert.strictEqual('Blue Book', getText)
    })

    it('should have the a logo', () => {
      const logo = $$('img#logo')

      assert.strictEqual(1, logo.length)
    })

    it(`should have a 'Log Out' link`, () => {
      const link = $$('a[href="/log-out"]')
      const getText = link[0].getText()

      assert.strictEqual(1, link.length)
      assert.strictEqual('Log Out', getText)
    })

    it(`should have a 'Back' link`, () => {
      const link = $$('a[href="/list"]')
      const getText = link[0].getText()

      assert.strictEqual(1, link.length)
      assert.strictEqual('Back', getText)
    })

    it(`should have the right sub-header`, () => {
      const subHeader = $$('h2#sub-header')
      const getText = subHeader[0].getText()

      assert.strictEqual(1, subHeader.length)
      assert.strictEqual('Geography', getText)
    })

    it(`should have the correct questions`, () => {
      const questions = $$('li.question')
      const questionOne = questions[0].getText()
      const questionTwo = questions[1].getText()

      assert.strictEqual(2, questions.length)
      assert.strictEqual('Bulgaria is in which continent?', questionOne)
      assert.strictEqual('Bolivia is in which continent?', questionTwo)
    })

    it(`should have the correct answers for each question`, () => {
      const answers = $$('label[for^="answer-"')
      const answerOne = answers[0].getText()
      const answerTwo = answers[1].getText()
      const answerThree = answers[2].getText()
      const answerFour = answers[3].getText()

      assert.strictEqual(4, answers.length)
      assert.strictEqual('Europe', answerOne)
      assert.strictEqual('South America', answerTwo)
      assert.strictEqual('Europe', answerThree)
      assert.strictEqual('South America', answerFour)
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
      const link = $('a[href="/log-out"]')
      link.click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it(`the 'Back' links should navigate to back to the 'List' page`, () => {
      restrictedQuiz()
      const link = $('a[href="/list"]')
      link.click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })

    it(`clicking an answer should change it's color`, () => {
      restrictedQuiz()
      const answer = $('label[for="answer-1"')
      const before = answer.getCSSProperty('color')
      answer.click()
      const after = answer.getCSSProperty('color')

      assert.strictEqual('#777777', before.parsed.hex)
      assert.strictEqual('#00ff88', after.parsed.hex)
    })

    it(`clicking 'Show correct answer' should change the color of the correct answer and 'Show' to 'Hide'`, () => {
      viewQuiz()
      const answer = $('label[for="answer-1"')
      const before = answer.getCSSProperty('color')
      const show = $('button[class="show"] span')
      show.click()
      const getText = show.getText()
      const after = answer.getCSSProperty('color')

      assert.strictEqual('Hide', getText)
      assert.strictEqual('#777777', before.parsed.hex)
      assert.strictEqual('#ffbb00', after.parsed.hex)
    })

    it(`clicking 'Hide correct answer' should change the color of the correct answer and 'Hide' to 'Show'`, () => {
      const answer = $('label[for="answer-1"')
      const before = answer.getCSSProperty('color')
      const hide = $('button[class="show"] span')
      hide.click()
      const getText = hide.getText()
      const after = answer.getCSSProperty('color')

      assert.strictEqual('Show', getText)
      assert.strictEqual('#ffbb00', before.parsed.hex)
      assert.strictEqual('#777777', after.parsed.hex)
    })

    it(`the 'Edit' link should nvaigate to the 'Edit-id' page`, () => {
      editQuiz()
      const link = $('a[href="/edit-1"]')
      link.click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/edit-1', url)
    })
  })
})
