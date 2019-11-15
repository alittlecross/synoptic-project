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

    it(`should have a 'Cancel' link`, () => {
      const link = $$('a[href="/list"]')
      const getText = link[0].getText()

      assert.strictEqual(1, link.length)
      assert.strictEqual('Cancel', getText)
    })

    it('should have an input for the quiz name', () => {
      const subHeader = $$('input#sub-header')
      const getValue = subHeader[0].getValue()

      assert.strictEqual(1, subHeader.length)
      assert.strictEqual('', getValue)
    })

    it('should have an input for a question', () => {
      const questions = $$('input.question')
      const questionOne = questions[0].getValue()

      assert.strictEqual(1, questions.length)
      assert.strictEqual('', questionOne)
    })

    it('should have inputs for two answers for each question', () => {
      const answers = $$('input.answer')
      const answerOne = answers[0].getValue()
      const answerTwo = answers[1].getValue()

      assert.strictEqual(2, answers.length)
      assert.strictEqual('', answerOne)
      assert.strictEqual('', answerTwo)
    })

    it(`should have the 'Correct' answer label for each answer`, () => {
      const correctLabels = $$('label[for*="correct"]')
      const correctLabelOne = correctLabels[0].getCSSProperty('color')
      const correctLabelTwo = correctLabels[1].getCSSProperty('color')

      assert.strictEqual(2, correctLabels.length)
      assert.strictEqual('#777777', correctLabelOne.parsed.hex)
      assert.strictEqual('#777777', correctLabelTwo.parsed.hex)
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
      const getText = submit[0].getText()

      assert.strictEqual(1, submit.length)
      assert.strictEqual('Submit', getText)
    })
  })

  context('Functionality', () => {
    it(`should add a question`, () => {
      const addButtons = $$('button.add')
      addButtons[1].click()
      const questions = $$('input.question')

      assert.strictEqual(2, questions.length)

      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
    })

    it(`should add an answer`, () => {
      const addButtons = $$('button.add')
      addButtons[0].click()
      const answers = $$('input.answer')

      assert.strictEqual(3, answers.length)

      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
    })

    it(`should delete a question`, () => {
      const addButtons = $$('button.add')
      addButtons[1].click()
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      const questions = $$('input.question')

      assert.strictEqual(1, questions.length)
    })

    it(`should delete an answer`, () => {
      const addButtons = $$('button.add')
      addButtons[0].click()
      const deleteButtons = $('button.delete')
      deleteButtons.click()
      const answers = $$('input.answer')

      assert.strictEqual(2, answers.length)
    })

    it(`shouldn't allow there to be less than one question`, () => {
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      const questions = $$('input.question')

      assert.strictEqual(1, questions.length)
    })

    it(`shouldn't allow there to be less than two answers`, () => {
      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
      const answers = $$('input.answer')

      assert.strictEqual(2, answers.length)
    })
  })
})
