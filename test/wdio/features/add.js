const assert = require('assert')
const { editAdd } = require('../support')

describe('Add View', () => {
  context('Elements', () => {
    it('should have the right title', () => {
      editAdd()
      const title = browser.getTitle()

      assert.strictEqual('Add Quiz', title)
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

    it(`should have a 'Cancel' link`, () => {
      const link = $$('a[href="/list"]')

      assert.strictEqual(1, link.length)
      assert.strictEqual('Cancel', link[0].getText())
    })

    it('should have an input for the quiz name', () => {
      const inputQuizName = $$('input#sub-header')
      const getValue = inputQuizName[0].getValue()

      assert.strictEqual(1, inputQuizName.length)
      assert.strictEqual('', getValue)
    })

    it('should have an input for a question', () => {
      const inputQuestions = $$('input.question')
      const inputQuestionOne = inputQuestions[0].getValue()

      assert.strictEqual(1, inputQuestions.length)
      assert.strictEqual('', inputQuestionOne)
    })

    it('should have inputs for two answers for each question', () => {
      const inputAnswers = $$('input.answer')
      const inputAnswerOne = inputAnswers[0].getValue()
      const inputAnswerTwo = inputAnswers[1].getValue()

      assert.strictEqual(2, inputAnswers.length)
      assert.strictEqual('', inputAnswerOne)
      assert.strictEqual('', inputAnswerTwo)
    })

    it(`should have the 'Correct' answer label for each answer`, () => {
      const labelCorrects = $$('label[for*="correct"]')
      const labelCorrectOne = labelCorrects[0].getCSSProperty('color')
      const labelCorrectTwo = labelCorrects[1].getCSSProperty('color')

      assert.strictEqual(2, labelCorrects.length)
      assert.strictEqual('#777777', labelCorrectOne.parsed.hex)
      assert.strictEqual('#777777', labelCorrectTwo.parsed.hex)
    })

    it(`should have 'Delete this answer', and 'Delete this question' buttons`, () => {
      const deleteButtons = $$('button.delete')
      const deleteButtonOne = deleteButtons[0].getText()
      const deleteButtonThree = deleteButtons[2].getText()

      assert.strictEqual(3, deleteButtons.length)
      assert.strictEqual('Delete this answer', deleteButtonOne)
      assert.strictEqual('Delete this question', deleteButtonThree)
    })

    it(`should have 'Add another answer', and 'Add another question' buttons`, () => {
      const addButtons = $$('button.add')
      const addButtonOne = addButtons[0].getText()
      const addButtonTwo = addButtons[1].getText()

      assert.strictEqual(2, addButtons.length)
      assert.strictEqual('Add another answer', addButtonOne)
      assert.strictEqual('Add another question', addButtonTwo)
    })

    it('should have a submit button', () => {
      const submit = $$('button[type="submit"]')

      assert.strictEqual(1, submit.length)
      assert.strictEqual('Submit', submit[0].getText())
    })
  })

  context('Functionality', () => {
    it(`should add a question block`, () => {
      const addButtons = $$('button.add')
      addButtons[1].click()
      const questions = $$('input.question')

      assert.strictEqual(2, questions.length)

      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
    })

    it(`should add an answer block`, () => {
      const addButtons = $$('button.add')
      addButtons[0].click()
      const answers = $$('input.answer')

      assert.strictEqual(3, answers.length)

      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
    })

    it(`should delete a question block`, () => {
      const addButtons = $$('button.add')
      addButtons[1].click()
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      const questions = $$('input.question')

      assert.strictEqual(1, questions.length)
    })

    it(`should delete an answer block`, () => {
      const addButtons = $$('button.add')
      addButtons[0].click()
      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
      const answers = $$('input.answer')

      assert.strictEqual(2, answers.length)
    })

    it(`shouldn't allow there to be less than one question block`, () => {
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      const questions = $$('input.question')

      assert.strictEqual(1, questions.length)
    })

    it(`shouldn't allow there to be less than two answers blocks`, () => {
      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
      const answers = $$('input.answer')

      assert.strictEqual(2, answers.length)
    })

    it(`should not add a quiz to the database after clicking the 'Cancel' link`, () => {
      const link = $$('a[href="/list"]')
      link[0].click()
      const url = browser.getUrl()
      const links = $$('a[href^="/quiz-"]')

      assert.strictEqual('http://localhost:3000/list', url)
      assert.strictEqual(3, links.length)
    })

    it('should add a quiz to the database', () => {
      editAdd()
      const addButtons = $$('button.add')
      addButtons[1].click()
      const inputQuizName = $$('input#sub-header')
      inputQuizName[0].setValue('English')
      const inputQuestions = $$('input.question')
      inputQuestions[0].setValue(`What does "won't" mean?`)
      inputQuestions[1].setValue(`What does "wont" mean?`)
      const inputAnswers = $$('input.answer')
      inputAnswers[0].setValue('Will not')
      inputAnswers[1].setValue('Custom')
      inputAnswers[2].setValue('Will not')
      inputAnswers[3].setValue('Custom')
      const labelCorrects = $$('label[for*="correct"]')
      labelCorrects[0].click()
      labelCorrects[3].click()
      const submit = $$('button[type="submit"]')
      submit[0].click()
      const url = browser.getUrl()
      const links = $$('a[href^="/quiz-"]')

      assert.strictEqual('http://localhost:3000/list', url)
      assert.strictEqual(4, links.length)
      assert.strictEqual('English', links[3].getText())

      links[3].click()
      const showAnswerButtons = $$('button[class="show"')
      showAnswerButtons[0].click()
      showAnswerButtons[1].click()
      const quizName = $$('h2#sub-header')
      const questions = $$('li.question')
      const answers = $$('label[for*="answer"]')
      const correctOneColor = answers[0].getCSSProperty('color')
      const correctTwoColor = answers[3].getCSSProperty('color')

      assert.strictEqual('English', quizName[0].getText())
      assert.strictEqual(`What does "won't" mean? Hide correct answer`, questions[0].getText())
      assert.strictEqual('Will not', answers[0].getText())
      assert.strictEqual('#ffbb00', correctOneColor.parsed.hex)
      assert.strictEqual('Custom', answers[1].getText())
      assert.strictEqual(`What does "wont" mean? Hide correct answer`, questions[1].getText())
      assert.strictEqual('Will not', answers[2].getText())
      assert.strictEqual('Custom', answers[3].getText())
      assert.strictEqual('#ffbb00', correctTwoColor.parsed.hex)
    })
  })
})
