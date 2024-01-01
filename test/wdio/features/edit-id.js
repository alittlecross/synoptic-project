import assert from "assert";
import { editEditId } from "../support.js";

describe("Edit-id View", () => {
  context("Elements", () => {
    it("should have the right title", async () => {
      await editEditId();
      const title = await browser.getTitle();

      assert.strictEqual("Edit Quiz", title);
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
      const link = await $$('a[href^="/quiz"]');

      assert.strictEqual(1, link.length);
      assert.strictEqual("Cancel", await link[0].getText());
    });

    it("should have the right quiz name", async () => {
      const subHeader = await $$("input#sub-header");
      const getValue = await subHeader[0].getValue();

      assert.strictEqual(1, subHeader.length);
      assert.strictEqual("English", getValue);
    });

    it("should have the correct questions", async () => {
      const questions = await $$("input.question");
      const questionOne = await questions[0].getValue();
      const questionTwo = await questions[1].getValue();

      assert.strictEqual(2, questions.length);
      assert.strictEqual(`What does "won't" mean?`, questionOne);
      assert.strictEqual(`What does "wont" mean?`, questionTwo);
    });

    it("should have the correct answers for each question", async () => {
      const answers = await $$("input.answer");
      const answerOne = await answers[0].getValue();
      const answerTwo = await answers[1].getValue();
      const answerThree = await answers[2].getValue();
      const answerFour = await answers[3].getValue();

      assert.strictEqual(4, answers.length);
      assert.strictEqual("Will not", answerOne);
      assert.strictEqual("Custom", answerTwo);
      assert.strictEqual("Will not", answerThree);
      assert.strictEqual("Custom", answerFour);
    });

    it(`should have the 'Correct' answer label for each answer`, async () => {
      const correctLabels = await $$('label[for*="correct"]');
      const correctLabelOne = await correctLabels[0].getCSSProperty("color");
      const correctLabelTwo = await correctLabels[1].getCSSProperty("color");
      const correctLabelThree = await correctLabels[2].getCSSProperty("color");
      const correctLabelFour = await correctLabels[3].getCSSProperty("color");

      assert.strictEqual(4, correctLabels.length);
      assert.strictEqual("#00ff88", correctLabelOne.parsed.hex);
      assert.strictEqual("#777777", correctLabelTwo.parsed.hex);
      assert.strictEqual("#777777", correctLabelThree.parsed.hex);
      assert.strictEqual("#00ff88", correctLabelFour.parsed.hex);
    });

    it(`should have 'Delete this answer', 'Delete this question', and 'Delete this quiz' buttons`, async () => {
      const deleteButtons = await $$("button.delete");
      const deleteButtonOne = await deleteButtons[0].getText();
      const deleteButtonThree = await deleteButtons[2].getText();
      const deleteButtonSeven = await deleteButtons[6].getText();

      assert.strictEqual(7, deleteButtons.length);
      assert.strictEqual("Delete this answer", deleteButtonOne);
      assert.strictEqual("Delete this question", deleteButtonThree);
      assert.strictEqual("Delete this quiz", deleteButtonSeven);
    });

    it(`should have 'Add another answer', and 'Add another question' buttons`, async () => {
      const addButtons = await $$("button.add");
      const addButtonOne = await addButtons[0].getText();
      const addButtonThree = await addButtons[2].getText();

      assert.strictEqual(3, addButtons.length);
      assert.strictEqual("Add another answer", addButtonOne);
      assert.strictEqual("Add another question", addButtonThree);
    });

    it("should have a submit button", async () => {
      const submit = await $$('button[type="submit"]');

      assert.strictEqual(1, submit.length);
      assert.strictEqual("Submit", await submit[0].getText());
    });
  });

  context("Functionality", () => {
    it(`should add a question`, async () => {
      const before = await $$("input.question");
      const addButtons = await $$("button.add");
      await addButtons[2].click();
      const after = await $$("input.question");

      assert.strictEqual(after.length, before.length + 1);

      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
    });

    it(`should add an answer`, async () => {
      const before = await $$("input.answer");
      const addButtons = await $$("button.add");
      await addButtons[0].click();
      const after = await $$("input.answer");

      assert.strictEqual(after.length, before.length + 1);

      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
    });

    it(`should delete a question`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[2].click();
      const before = await $$("input.question");
      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
      const after = await $$("input.question");

      assert.strictEqual(after.length, before.length - 1);
    });

    it(`should delete an answer`, async () => {
      const addButtons = await $$("button.add");
      await addButtons[0].click();
      const before = await $$("input.answer");
      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
      const after = await $$("input.answer");

      assert.strictEqual(after.length, before.length - 1);
    });

    it(`shouldn't allow there to be less than one question`, async () => {
      const before = await $$("input.question");
      const deleteButtons = await $$("button.delete");
      await deleteButtons[2].click();
      await deleteButtons[2].click();
      const after = await $$("input.question");

      assert.strictEqual(2, before.length);
      assert.strictEqual(1, after.length);
    });

    it(`shouldn't allow there to be less than two answers`, async () => {
      const before = await $$("input.answer");
      const deleteButtons = await $$("button.delete");
      await deleteButtons[0].click();
      await deleteButtons[0].click();
      const after = await $$("input.answer");

      assert.strictEqual(2, before.length);
      assert.strictEqual(2, after.length);
    });

    it(`should not update a quiz in the database after clicking the 'Cancel' link`, async () => {
      const link = await $$('a[href^="/quiz"]');
      await link[0].click();

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

    it("should update a quiz in the database", async () => {
      await editEditId();
      const addButtons = await $$("button.add");
      await addButtons[2].click();
      await addButtons[1].click();
      const inputQuizName = await $$("input#sub-header");
      await inputQuizName[0].setValue("History");
      const inputQuestions = await $$("input.question");
      await inputQuestions[1].setValue(`When was World War I?`);
      await inputQuestions[2].setValue(`When was World War II?`);
      const inputAnswers = await $$("input.answer");
      await inputAnswers[3].setValue("1914-1918");
      await inputAnswers[4].setValue("1939-1945");
      await inputAnswers[5].setValue("1914-1918");
      await inputAnswers[6].setValue("1939-1945");
      const labelCorrects = await $$('label[for*="correct"]');
      await labelCorrects[6].click();
      const deleteButtons = await $$("button.delete");
      await deleteButtons[3].click();
      await deleteButtons[2].click();
      const submit = await $$('button[type="submit"]');
      await submit[0].click();
      const showAnswerButtons = await $$('button[class="show"');
      await showAnswerButtons[0].click();
      await showAnswerButtons[1].click();
      const quizName = await $$("h2#sub-header");
      const questions = await $$("li.question");
      const answers = await $$('label[for*="answer"]');
      const correctOneColor = await answers[0].getCSSProperty("color");
      const correctTwoColor = await answers[3].getCSSProperty("color");

      assert.strictEqual("History", await quizName[0].getText());
      assert.strictEqual(
        `When was World War I? Hide correct answer`,
        await questions[0].getText()
      );
      assert.strictEqual("1914-1918", await answers[0].getText());
      assert.strictEqual("#ffbb00", correctOneColor.parsed.hex);
      assert.strictEqual("1939-1945", await answers[1].getText());
      assert.strictEqual(
        `When was World War II? Hide correct answer`,
        await questions[1].getText()
      );
      assert.strictEqual("1914-1918", await answers[2].getText());
      assert.strictEqual("1939-1945", await answers[3].getText());
      assert.strictEqual("#ffbb00", correctTwoColor.parsed.hex);
    });

    it("should delete a quiz from the database", async () => {
      const edit = await $('a[href^="/edit"]');
      await edit.click();
      const deleteButtons = await $$("button.delete");
      await deleteButtons[6].click();
      const url = await browser.getUrl();
      const links = await $$('a[href^="/quiz-"]');

      assert.strictEqual("http://localhost:3000/list", url);
      assert.strictEqual(3, links.length);
    });
  });
});
