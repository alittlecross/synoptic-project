import assert from "assert";
import { restrictedQuiz, viewQuiz, editQuiz } from "../support.js";

describe("Quiz-id View", () => {
  context("Elements", () => {
    it("should have the right title", async () => {
      await restrictedQuiz();
      const title = await browser.getTitle();

      assert.strictEqual("Quiz - Geography", title);
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

    it(`should have a 'Back' link`, async () => {
      const link = await $$('a[href="/list"]');

      assert.strictEqual(1, link.length);
      assert.strictEqual("Back", await link[0].getText());
    });

    it(`should have the right sub-header`, async () => {
      const subHeader = await $$("h2#sub-header");

      assert.strictEqual(1, subHeader.length);
      assert.strictEqual("Geography", await subHeader[0].getText());
    });

    it(`should have the correct questions`, async () => {
      const questions = await $$("li.question");

      assert.strictEqual(2, questions.length);
      assert.strictEqual(
        "Bulgaria is in which continent?",
        await questions[0].getText()
      );
      assert.strictEqual(
        "Bolivia is in which continent?",
        await questions[1].getText()
      );
    });

    it(`should have the correct answers for each question`, async () => {
      const answers = await $$('label[for^="answer-"');

      assert.strictEqual(4, answers.length);
      assert.strictEqual("Europe", await answers[0].getText());
      assert.strictEqual("South America", await answers[1].getText());
      assert.strictEqual("Europe", await answers[2].getText());
      assert.strictEqual("South America", await answers[3].getText());
    });

    it(`should not have an 'Edit' link (restricted access)`, async () => {
      const link = await $$('a[href^="/edit-"');

      assert.strictEqual(0, link.length);
    });

    it(`should not have 'Show correct answer' buttons (restricted access)`, async () => {
      const buttons = await $$('button[class="show"');

      assert.strictEqual(0, buttons.length);
    });

    it(`should not have an 'Edit' link (view access)`, async () => {
      await viewQuiz();
      const link = await $$('a[href^="/edit-"');

      assert.strictEqual(0, link.length);
    });

    it(`should have 'Show correct answer' buttons (view access)`, async () => {
      const buttons = await $$('button[class="show"');

      assert.strictEqual(2, buttons.length);
    });

    it(`should not have an 'Edit' link (edit access)`, async () => {
      await editQuiz();
      const link = await $$('a[href^="/edit-"');

      assert.strictEqual(1, link.length);
    });

    it(`should have 'Show correct answer' buttons (edit access)`, async () => {
      const buttons = await $$('button[class="show"');

      assert.strictEqual(2, buttons.length);
    });
  });

  context("Functionality", () => {
    it(`the 'Log Out' link should return to the use to the 'Log In' page`, async () => {
      await restrictedQuiz();
      const link = await $$('a[href="/log-out"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`the 'Back' links should navigate to back to the 'List' page`, async () => {
      await restrictedQuiz();
      const link = await $$('a[href="/list"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`clicking an answer should change it's color`, async () => {
      await restrictedQuiz();
      const answer = await $$('label[for="answer-1"');
      const before = await answer[0].getCSSProperty("color");
      await answer[0].click();
      const after = await answer[0].getCSSProperty("color");

      assert.strictEqual("#777777", before.parsed.hex);
      assert.strictEqual("#00ff88", after.parsed.hex);
    });

    it(`clicking 'Show correct answer' should change the color of the correct answer and 'Show' to 'Hide'`, async () => {
      await viewQuiz();
      const answer = await $$('label[for="answer-1"');
      const before = await answer[0].getCSSProperty("color");
      const show = await $$('button[class="show"] span');
      await show[0].click();
      const after = await answer[0].getCSSProperty("color");

      assert.strictEqual("Hide", await show[0].getText());
      assert.strictEqual("#777777", before.parsed.hex);
      assert.strictEqual("#ffbb00", after.parsed.hex);
    });

    it(`clicking 'Hide correct answer' should change the color of the correct answer and 'Hide' to 'Show'`, async () => {
      const answer = await $$('label[for="answer-1"');
      const before = await answer[0].getCSSProperty("color");
      const hide = await $$('button[class="show"] span');
      await hide[0].click();
      const after = await answer[0].getCSSProperty("color");

      assert.strictEqual("Show", await hide[0].getText());
      assert.strictEqual("#ffbb00", before.parsed.hex);
      assert.strictEqual("#777777", after.parsed.hex);
    });

    it(`the 'Edit' link should navigate to the 'Edit-id' page`, async () => {
      await editQuiz();
      const link = await $$('a[href="/edit-1"]');
      await link[0].click();
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/edit-1", url);
    });
  });
});
