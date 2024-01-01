import assert from "assert";
import { restrictedLogIn, viewLogIn, editLogIn } from "../support.js";

describe("List View", () => {
  context("Elements", () => {
    it("should have the right title", async () => {
      await restrictedLogIn();
      const title = await browser.getTitle();

      assert.strictEqual("Quiz List", title);
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

    it(`should have a 'Log Out' link`, async () => {
      const link = await $$('a[href="/log-out"]');

      assert.strictEqual(1, link.length);
      assert.strictEqual("Log Out", await link[0].getText());
    });

    it("should have quiz links", async () => {
      const links = await $$('a[href^="/quiz-"]');

      assert.strictEqual(3, links.length);
      assert.strictEqual("Geography", await links[0].getText());
      assert.strictEqual("Maths", await links[1].getText());
      assert.strictEqual("Science", await links[2].getText());
    });

    it(`should not have an 'add' link (restricted access)`, async () => {
      const link = await $$('a[href="/add"]');

      assert.strictEqual(0, link.length);
    });

    it(`should not have an 'add' link (view access)`, async () => {
      await viewLogIn();
      const link = await $$('a[href="/add"]');

      assert.strictEqual(0, link.length);
    });

    it(`should have an 'add' link (edit access)`, async () => {
      await editLogIn();
      const link = await $$('a[href="/add"]');

      assert.strictEqual(1, link.length);
    });
  });

  context("Functionality", () => {
    it(`the 'Log Out' link should return to the use to the 'Log In' page`, async () => {
      await restrictedLogIn();
      const link = await $$('a[href="/log-out"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it("the quiz links should navigate to a quiz", async () => {
      await restrictedLogIn();
      const link = await $$('a[href="/quiz-1"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/quiz-1", url);
    });

    it(`the 'Add' link should navigate to the 'Add' page`, async () => {
      await editLogIn();
      const link = await $$('a[href="/add"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/add", url);
    });
  });
});
