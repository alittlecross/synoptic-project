import assert from "assert";

describe("Index View", () => {
  context("Elements", () => {
    it("should have the right title", async () => {
      await browser.url("/");
      const title = await browser.getTitle();

      assert.strictEqual("Log In", title);
    });

    it("should have the right main header", async () => {
      const mainHeader = await $$("h1#main-header");

      assert.strictEqual(1, mainHeader.length);
      assert.strictEqual("Blue Book", await mainHeader[0].getText());
    });

    it("should have the a logo", async () => {
      const logo = await $$("img#logo");

      assert.strictEqual(1, logo.length);
    });

    it(`should have a 'username' input field`, async () => {
      const username = await $$('input[name="username"]');

      assert.strictEqual(1, username.length);
    });

    it(`should have a 'password' input field`, async () => {
      const password = await $$('input[name="password"]');

      assert.strictEqual(1, password.length);
    });

    it("should have a submit button", async () => {
      const submit = await $$('button[type="submit"]');

      assert.strictEqual(1, submit.length);
      assert.strictEqual("Submit", await submit[0].getText());
    });
  });

  context("Functionality", () => {
    it("should display a message if the username is incorrect", async () => {
      const username = await $('input[name="username"]');
      await username.setValue("restricted@email.co");
      const password = await $('input[name="password"]');
      await password.setValue("password");
      const submit = await $('button[type="submit"]');
      await submit.click();
      const flash = await $("div#flash");

      assert.strictEqual(
        "Username or password incorrect",
        await flash.getText()
      );
    });

    it("should display a message if the password is incorrect", async () => {
      const username = await $('input[name="username"]');
      await username.setValue("restricted@email.com");
      const password = await $('input[name="password"]');
      await password.setValue("passwor");
      const submit = await $('button[type="submit"]');
      await submit.click();
      const flash = await $("div#flash");

      assert.strictEqual(
        "Username or password incorrect",
        await flash.getText()
      );
    });

    it("should log in if the username and password are correct", async () => {
      const username = await $('input[name="username"]');
      await username.setValue("restricted@email.com");
      const password = await $('input[name="password"]');
      await password.setValue("password");
      const submit = await $('button[type="submit"]');
      await submit.click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });
  });
});
