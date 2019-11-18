const assert = require('assert')

describe('Index View', () => {
  context('Elements', () => {
    it('should have the right title', () => {
      browser.url('/')
      const title = browser.getTitle()

      assert.strictEqual('Log In', title)
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

    it(`should have a 'username' input field`, () => {
      const username = $$('input[name="username"]')

      assert.strictEqual(1, username.length)
    })

    it(`should have a 'password' input field`, () => {
      const password = $$('input[name="password"]')

      assert.strictEqual(1, password.length)
    })

    it('should have a submit button', () => {
      const submit = $$('button[type="submit"]')

      assert.strictEqual(1, submit.length)
      assert.strictEqual('Submit', submit[0].getText())
    })
  })

  context('Functionality', () => {
    it('should display a message if the username is incorrect', () => {
      const username = $('input[name="username"]')
      username.setValue('restricted@email.co')
      const password = $('input[name="password"]')
      password.setValue('password')
      const submit = $('button[type="submit"]')
      submit.click()
      const flash = $('div#flash')

      assert.strictEqual('Username or password incorrect', flash.getText())
    })

    it('should display a message if the password is incorrect', () => {
      const username = $('input[name="username"]')
      username.setValue('restricted@email.com')
      const password = $('input[name="password"]')
      password.setValue('passwor')
      const submit = $('button[type="submit"]')
      submit.click()
      const flash = $('div#flash')

      assert.strictEqual('Username or password incorrect', flash.getText())
    })

    it('should log in if the username and password are correct', () => {
      const username = $('input[name="username"]')
      username.setValue('restricted@email.com')
      const password = $('input[name="password"]')
      password.setValue('password')
      const submit = $('button[type="submit"]')
      submit.click()
      const url = browser.getUrl()

      assert.strictEqual('http://localhost:3000/list', url)
    })
  })
})
