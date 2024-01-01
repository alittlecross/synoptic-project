import assert from "assert";
import { editAdd } from "../support.js";

describe("Add View", () => {
  context("Elements", () => {
    it("should have the right title", async () => {
      await editAdd();
      const title = await browser.getTitle();

      assert.strictEqual("Add Quiz", title);
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

    it(`should have a 'Cancel' link`, async () => {
      const link = await $$('a[href="/list"]');

      assert.strictEqual(1, link.length);
      assert.strictEqual("Cancel", await link[0].getText());
    });

    it("should have an input for the quiz name", async () => {
      const inputQuizName = await $$("input#sub-header");
      const getValue = await inputQuizName[0].getValue();

      assert.strictEqual(1, inputQuizName.length);
      assert.strictEqual("", getValue);
    });

    it("should have an input for a question", async () => {
      const inputQuestions = await $$("input.question");
      const inputQuestionOne = await inputQuestions[0].getValue();

      assert.strictEqual(1, inputQuestions.length);
      assert.strictEqual("", inputQuestionOne);
    });

    it("should have inputs for two answers for each question", async () => {
      const inputAnswers = await $$("input.answer");
      const inputAnswerOne = await inputAnswers[0].getValue();
      const inputAnswerTwo = await inputAnswers[1].getValue();

      assert.strictEqual(2, inputAnswers.length);
      assert.strictEqual("", inputAnswerOne);
      assert.strictEqual("", inputAnswerTwo);
    });

    it(`should have the 'Correct' answer label for each answer`, async () => {
      const labelCorrects = await $$('label[for*="correct"]');
      const labelCorrectOne = await labelCorrects[0].getCSSProperty("color");
      const labelCorrectTwo = await labelCorrects[1].getCSSProperty("color");

      assert.strictEqual(2, labelCorrects.length);
      assert.strictEqual("#777777", labelCorrectOne.parsed.hex);
      assert.strictEqual("#777777", labelCorrectTwo.parsed.hex);
    });

    it(`should have 'Delete this answer', and 'Delete this question' buttons`, async () => {
      const deleteButtons = await $$("button.delete");
      const deleteButtonOne = await deleteButtons[0].getText();
      const deleteButtonThree = await deleteButtons[2].getText();

      assert.strictEqual(3, deleteButtons.length);
      assert.strictEqual("Delete this answer", deleteButtonOne);
      assert.strictEqual("Delete this question", deleteButtonThree);
    });

    it(`should have 'Add another answer', and 'Add another question' buttons`, async () => {
      const addButtons = await $$("button.add");
      const addButtonOne = await addButtons[0].getText();
      const addButtonTwo = await addButtons[1].getText();

      assert.strictEqual(2, addButtons.length);
      assert.strictEqual("Add another answer", addButtonOne);
      assert.strictEqual("Add another question", addButtonTwo);
    });

    it("should have a submit button", async () => {
      const submit = await $$('button[type="submit"]');

      assert.strictEqual(1, submit.length);
      assert.strictEqual("Submit", await submit[0].getText());
    });
  });

  context("Functionality", () => {
    it(`should add a question block`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[1].click();
      const questions = await $$("input.question");

      assert.strictEqual(2, questions.length);

      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
    });

    it(`should add an answer block`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[0].click();
      const answers = await $$("input.answer");

      assert.strictEqual(3, answers.length);

      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
    });

    it(`should delete a question block`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[1].click();
      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
      const questions = await $$("input.question");

      assert.strictEqual(1, questions.length);
    });

    it(`should delete an answer block`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[0].click();
      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
      const answers = await $$("input.answer");

      assert.strictEqual(2, answers.length);
    });

    it(`shouldn't allow there to be less than one question block`, async () => {
      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
      const questions = await $$("input.question");

      assert.strictEqual(1, questions.length);
    });

    it(`shouldn't allow there to be less than two answers blocks`, async () => {
      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
      const answers = await $$("input.answer");

      assert.strictEqual(2, answers.length);
    });

    it(`should not add a quiz to the database after clicking the 'Cancel' link`, async () => {
      const link = await $$('a[href="/list"]');
      await link[0].click();
      const url = await browser.getUrl();
      const links = await $$('a[href^="/quiz-"]');

      assert.strictEqual("http://localhost:3000/list", url);
      assert.strictEqual(3, links.length);
    });

    it("should add a quiz to the database", async () => {
      await editAdd();
      const addButtons = await $$("button.add");
      await addButtons[1].click();
      const inputQuizName = await $$("input#sub-header");
      await inputQuizName[0].setValue("English");
      const inputQuestions = await $$("input.question");
      await inputQuestions[0].setValue(`What does "won't" mean?`);
      await inputQuestions[1].setValue(`What does "wont" mean?`);
      const inputAnswers = await $$("input.answer");
      await inputAnswers[0].setValue("Will not");
      await inputAnswers[1].setValue("Custom");
      await inputAnswers[2].setValue("Will not");
      await inputAnswers[3].setValue("Custom");
      const labelCorrects = await $$('label[for*="correct"]');
      await labelCorrects[0].click();
      await labelCorrects[3].click();
      const submit = await $$('button[type="submit"]');
      await submit[0].click();
      const url = await browser.getUrl();
      const links = await $$('a[href^="/quiz-"]');

      assert.strictEqual("http://localhost:3000/list", url);
      assert.strictEqual(4, links.length);
      assert.strictEqual("English", await links[3].getText());

      await links[3].click();
      const showAnswerButtons = await $$('button[class="show"');
      await showAnswerButtons[0].click();
      await showAnswerButtons[1].click();
      const quizName = await $$("h2#sub-header");
      const questions = await $$("li.question");
      const answers = await $$('label[for*="answer"]');
      const correctOneColor = await answers[0].getCSSProperty("color");
      const correctTwoColor = await answers[3].getCSSProperty("color");

      assert.strictEqual("English", await quizName[0].getText());
      assert.strictEqual(
        `What does "won't" mean? Hide correct answer`,
        await questions[0].getText()
      );
      assert.strictEqual("Will not", await answers[0].getText());
      assert.strictEqual("#ffbb00", correctOneColor.parsed.hex);
      assert.strictEqual("Custom", await answers[1].getText());
      assert.strictEqual(
        `What does "wont" mean? Hide correct answer`,
        await questions[1].getText()
      );
      assert.strictEqual("Will not", await answers[2].getText());
      assert.strictEqual("Custom", await answers[3].getText());
      assert.strictEqual("#ffbb00", correctTwoColor.parsed.hex);
    });
  });
});
