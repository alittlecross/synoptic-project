const assert = require('assert')
const { editEditId } = require('../support')

describe('Edit-id View', () => {
  context('Elements', () => {
    it('should have the right title', () => {
      editEditId()
      const title = browser.getTitle()

      assert.strictEqual('Edit Quiz', title)
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
      const link = $$('a[href^="/quiz"]')

      assert.strictEqual(1, link.length)
      assert.strictEqual('Cancel', link[0].getText())
    })

    it('should have the right quiz name', () => {
      const subHeader = $$('input#sub-header')
      const getValue = subHeader[0].getValue()

      assert.strictEqual(1, subHeader.length)
      assert.strictEqual('English', getValue)
    })

    it('should have the correct questions', () => {
      const questions = $$('input.question')
      const questionOne = questions[0].getValue()
      const questionTwo = questions[1].getValue()

      assert.strictEqual(2, questions.length)
      assert.strictEqual(`What does "won't" mean?`, questionOne)
      assert.strictEqual(`What does "wont" mean?`, questionTwo)
    })

    it('should have the correct answers for each question', () => {
      const answers = $$('input.answer')
      const answerOne = answers[0].getValue()
      const answerTwo = answers[1].getValue()
      const answerThree = answers[2].getValue()
      const answerFour = answers[3].getValue()

      assert.strictEqual(4, answers.length)
      assert.strictEqual('Will not', answerOne)
      assert.strictEqual('Custom', answerTwo)
      assert.strictEqual('Will not', answerThree)
      assert.strictEqual('Custom', answerFour)
    })

    it(`should have the 'Correct' answer label for each answer`, () => {
      const correctLabels = $$('label[for*="correct"]')
      const correctLabelOne = correctLabels[0].getCSSProperty('color')
      const correctLabelTwo = correctLabels[1].getCSSProperty('color')
      const correctLabelThree = correctLabels[2].getCSSProperty('color')
      const correctLabelFour = correctLabels[3].getCSSProperty('color')

      assert.strictEqual(4, correctLabels.length)
      assert.strictEqual('#00ff88', correctLabelOne.parsed.hex)
      assert.strictEqual('#777777', correctLabelTwo.parsed.hex)
      assert.strictEqual('#777777', correctLabelThree.parsed.hex)
      assert.strictEqual('#00ff88', correctLabelFour.parsed.hex)
    })

    it(`should have 'Delete this answer', 'Delete this question', and 'Delete this quiz' buttons`, () => {
      const deleteButtons = $$('button.delete')
      const deleteButtonOne = deleteButtons[0].getText()
      const deleteButtonThree = deleteButtons[2].getText()
      const deleteButtonSeven = deleteButtons[6].getText()

      assert.strictEqual(7, deleteButtons.length)
      assert.strictEqual('Delete this answer', deleteButtonOne)
      assert.strictEqual('Delete this question', deleteButtonThree)
      assert.strictEqual('Delete this quiz', deleteButtonSeven)
    })

    it(`should have 'Add another answer', and 'Add another question' buttons`, () => {
      const addButtons = $$('button.add')
      const addButtonOne = addButtons[0].getText()
      const addButtonThree = addButtons[2].getText()

      assert.strictEqual(3, addButtons.length)
      assert.strictEqual('Add another answer', addButtonOne)
      assert.strictEqual('Add another question', addButtonThree)
    })

    it('should have a submit button', () => {
      const submit = $$('button[type="submit"]')

      assert.strictEqual(1, submit.length)
      assert.strictEqual('Submit', submit[0].getText())
    })
  })

  context('Functionality', () => {
    it(`should add a question`, () => {
      const before = $$('input.question')
      const addButtons = $$('button.add')
      addButtons[2].click()
      const after = $$('input.question')

      assert.strictEqual(after.length, before.length + 1)

      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
    })

    it(`should add an answer`, () => {
      const before = $$('input.answer')
      const addButtons = $$('button.add')
      addButtons[0].click()
      const after = $$('input.answer')

      assert.strictEqual(after.length, before.length + 1)

      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
    })

    it(`should delete a question`, () => {
      const addButtons = $$('button.add')
      addButtons[2].click()
      const before = $$('input.question')
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      const after = $$('input.question')

      assert.strictEqual(after.length, before.length - 1)
    })

    it(`should delete an answer`, () => {
      const addButtons = $$('button.add')
      addButtons[0].click()
      const before = $$('input.answer')
      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
      const after = $$('input.answer')

      assert.strictEqual(after.length, before.length - 1)
    })

    it(`shouldn't allow there to be less than one question`, () => {
      const before = $$('input.question')
      const deleteButtons = $$('button.delete')
      deleteButtons[2].click()
      deleteButtons[2].click()
      const after = $$('input.question')

      assert.strictEqual(2, before.length)
      assert.strictEqual(1, after.length)
    })

    it(`shouldn't allow there to be less than two answers`, () => {
      const before = $$('input.answer')
      const deleteButtons = $$('button.delete')
      deleteButtons[0].click()
      deleteButtons[0].click()
      const after = $$('input.answer')

      assert.strictEqual(2, before.length)
      assert.strictEqual(2, after.length)
    })

    it(`should not update a quiz in the database after clicking the 'Cancel' link`, () => {
      const link = $$('a[href^="/quiz"]')
      link[0].click()

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

    it('should update a quiz in the database', () => {
      editEditId()
      const addButtons = $$('button.add')
      addButtons[2].click()
      addButtons[1].click()
      const inputQuizName = $$('input#sub-header')
      inputQuizName[0].setValue('History')
      const inputQuestions = $$('input.question')
      inputQuestions[1].setValue(`When was World War I?`)
      inputQuestions[2].setValue(`When was World War II?`)
      const inputAnswers = $$('input.answer')
      inputAnswers[3].setValue('1914-1918')
      inputAnswers[4].setValue('1939-1945')
      inputAnswers[5].setValue('1914-1918')
      inputAnswers[6].setValue('1939-1945')
      const labelCorrects = $$('label[for*="correct"]')
      labelCorrects[6].click()
      const deleteButtons = $$('button.delete')
      deleteButtons[3].click()
      deleteButtons[2].click()
      const submit = $$('button[type="submit"]')
      submit[0].click()
      const showAnswerButtons = $$('button[class="show"')
      showAnswerButtons[0].click()
      showAnswerButtons[1].click()
      const quizName = $$('h2#sub-header')
      const questions = $$('li.question')
      const answers = $$('label[for*="answer"]')
      const correctOneColor = answers[0].getCSSProperty('color')
      const correctTwoColor = answers[3].getCSSProperty('color')

      assert.strictEqual('History', quizName[0].getText())
      assert.strictEqual(`When was World War I? Hide correct answer`, questions[0].getText())
      assert.strictEqual('1914-1918', answers[0].getText())
      assert.strictEqual('#ffbb00', correctOneColor.parsed.hex)
      assert.strictEqual('1939-1945', answers[1].getText())
      assert.strictEqual(`When was World War II? Hide correct answer`, questions[1].getText())
      assert.strictEqual('1914-1918', answers[2].getText())
      assert.strictEqual('1939-1945', answers[3].getText())
      assert.strictEqual('#ffbb00', correctTwoColor.parsed.hex)
    })

    it('should delete a quiz from the database', () => {
      const edit = $('a[href^="/edit"]')
      edit.click()
      const deleteButtons = $$('button.delete')
      deleteButtons[6].click()
      const url = browser.getUrl()
      const links = $$('a[href^="/quiz-"]')

      assert.strictEqual('http://localhost:3000/list', url)
      assert.strictEqual(3, links.length)
    })
  })
})
