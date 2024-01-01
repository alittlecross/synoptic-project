import assert from "assert";
import { restrictedLogIn, viewLogIn, editLogIn } from "../support.js";

describe("All Views", () => {
  context("No Access", () => {
    it(`allows the user to visit '/'`, async () => {
      await browser.url("/");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/log-in'`, async () => {
      await browser.url("/");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/list'`, async () => {
      await browser.url("/list");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/log-out'`, async () => {
      await browser.url("/log-out");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/quiz-1'`, async () => {
      await browser.url("/quiz-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/question-1-correct-answer'`, async () => {
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/add'`, async () => {
      await browser.url("/add");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/edit-1'`, async () => {
      await browser.url("/edit-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });
  });

  context("Restricted Access", () => {
    it(`allows the user to visit '/'`, async () => {
      await restrictedLogIn();
      await browser.url("/");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/log-in'`, async () => {
      await restrictedLogIn();
      await browser.url("/log-in");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/list'`, async () => {
      await browser.url("/list");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/log-out'`, async () => {
      await browser.url("/log-out");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`allows the user to visit '/quiz-1'`, async () => {
      await restrictedLogIn();
      await browser.url("/quiz-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/quiz-1", url);
    });

    it(`does not allow the user to visit '/question-1-correct-answer'`, async () => {
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`does not allow the user to visit '/add'`, async () => {
      await browser.url("/add");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`does not allow the user to visit '/edit-1'`, async () => {
      await browser.url("/edit-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });
  });

  context("View Access", () => {
    it(`allows the user to visit '/'`, async () => {
      await viewLogIn();
      await browser.url("/");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit /log-in`, async () => {
      await viewLogIn();
      await browser.url("/log-in");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/list'`, async () => {
      await browser.url("/list");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/log-out'`, async () => {
      await browser.url("/log-out");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/question-1-correct-answer' from the list page`, async () => {
      await viewLogIn();
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/quiz-1'`, async () => {
      await browser.url("/quiz-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/quiz-1", url);
    });

    it(`gives the correct response when visiting '/question-1-correct-answer' from the quiz-1 page`, async () => {
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();
      const pre = await $$("pre");

      assert.strictEqual(
        "http://localhost:3000/question-1-correct-answer",
        url
      );
      assert.strictEqual('{"id":1}', await pre[0].getText());
    });

    it(`gives the correct response when visiting '/question-3-correct-answer' from the quiz-1 page`, async () => {
      await browser.url("/question-3-correct-answer");
      const url = await browser.getUrl();
      const pre = await $$("pre");

      assert.strictEqual(
        "http://localhost:3000/question-3-correct-answer",
        url
      );
      assert.strictEqual(
        '{"warning":"this route does not relate to the currently cached quiz"}',
        await pre[0].getText()
      );
    });

    it(`does not allow the user to visit '/add'`, async () => {
      await browser.url("/add");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`does not allow the user to visit '/edit-1'`, async () => {
      await browser.url("/edit-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });
  });

  context("Edit Access", () => {
    it(`allows the user to visit '/'`, async () => {
      await editLogIn();
      await browser.url("/");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit /log-in`, async () => {
      await editLogIn();
      await browser.url("/log-in");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/list'`, async () => {
      await browser.url("/list");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/log-out'`, async () => {
      await browser.url("/log-out");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/", url);
    });

    it(`does not allow the user to visit '/question-1-correct-answer' from the list page`, async () => {
      await editLogIn();
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/list", url);
    });

    it(`allows the user to visit '/quiz-1'`, async () => {
      await browser.url("/quiz-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/quiz-1", url);
    });

    it(`gives the correct response when visiting '/question-1-correct-answer' from the quiz-1 page`, async () => {
      await browser.url("/question-1-correct-answer");
      const url = await browser.getUrl();
      const pre = await $$("pre");

      assert.strictEqual(
        "http://localhost:3000/question-1-correct-answer",
        url
      );
      assert.strictEqual('{"id":1}', await pre[0].getText());
    });

    it(`gives the correct response when visiting '/question-3-correct-answer' from the quiz-1 page`, async () => {
      await browser.url("/question-3-correct-answer");
      const url = await browser.getUrl();
      const pre = await $$("pre");

      assert.strictEqual(
        "http://localhost:3000/question-3-correct-answer",
        url
      );
      assert.strictEqual(
        '{"warning":"this route does not relate to the currently cached quiz"}',
        await pre[0].getText()
      );
    });

    it(`allows the user to visit '/add'`, async () => {
      await browser.url("/add");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/add", url);
    });

    it(`allows the user to visit '/edit-1'`, async () => {
      await browser.url("/edit-1");
      const url = await browser.getUrl();

      assert.strictEqual("http://localhost:3000/edit-1", url);
    });
  });
});
