const assert = require('assert')

describe('Log In', () => {
  context('Elements', () => {
    it('should have the right title', async () => {
      await browser.url('/')
      const title = await browser.getTitle()
      assert.strictEqual('Log In', title)
    })

    it('should have the right main header', async () => {
      const mainHeader = await $('.main-header')
      const getText = await mainHeader.getText()
      assert.strictEqual('Blue Book', getText)
    })

    it(`should have a 'username' input field`, async () => {
      const username = await $$('[name="username"]')
      assert.strictEqual(1, username.length)
    })

    it(`should have a 'password' input field`, async () => {
      const password = await $$('[name="password"]')

      assert.strictEqual(1, password.length)
    })

    it('should have a submit button', async () => {
      const submit = await $$('button[type="submit"]')

      assert.strictEqual(1, submit.length)
    })
  })

  context('Functionality', () => {
    it('should log in if the username and password are correct', async () => {
      assert.strictEqual()
    })

    it('should display a message if the username is incorrect', async () => {
      assert.strictEqual()
    })

    it('should display a message if the password is incorrect', async () => {
      assert.strictEqual()
    })
  })
})
