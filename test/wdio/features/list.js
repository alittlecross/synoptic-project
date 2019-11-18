const assert = require('assert')
const { restrictedLogIn, viewLogIn, editLogIn } = require('../support')

describe('List View', () => {
  context('Elements', () => {
    it('should have the right title', () => {
      restrictedLogIn()
      const title = browser.getTitle()

      assert.strictEqual('Quiz List', title)
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

    it('should have quiz links', () => {
      const links = $$('a[href^="/quiz-"]')

      assert.strictEqual(3, links.length)
      assert.strictEqual('Geography', links[0].getText())
      assert.strictEqual('Maths', links[1].getText())
      assert.strictEqual('Science', links[2].getText())
    })

    it(`should not have an 'add' link (restricted access)`, () => {
      const link = $$('a[href="/add"]')

      assert.strictEqual(0, link.length)
    })

    it(`should not have an 'add' link (view access)`, () => {
      viewLogIn()
      const link = $$('a[href="/add"]')

      assert.strictEqual(0, link.length)
    })

    it(`should have an 'add' link (edit access)`, () => {
      editLogIn()
      const link = $$('a[href="/add"]')

      assert.strictEqual(1, link.length)
    })
  })

  context('Functionality', () => {
    it(`the 'Log Out' link should return to the use to the 'Log In' page`, () => {
      restrictedLogIn()
      const link = $$('a[href="/log-out"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/', url)
    })

    it('the quiz links should navigate to a quiz', () => {
      restrictedLogIn()
      const link = $$('a[href="/quiz-1"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/quiz-1', url)
    })

    it(`the 'Add' link should navigate to the 'Add' page`, () => {
      editLogIn()
      const link = $$('a[href="/add"]')
      link[0].click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/add', url)
    })
  })
})
