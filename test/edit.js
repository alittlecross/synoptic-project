import sinon from "sinon";
import { expect } from "chai";
import {
  quiz,
  updateDeletions,
  updateChanges,
  updateNoChanges,
} from "./support.js";

import Edit from "../server/lib/edit.js";
import DatabaseQuizes from "../server/services/quizes.js";
import DatabaseQuestions from "../server/services/questions.js";
import DatabaseAnswers from "../server/services/answers.js";

import Add from "../server/lib/add.js";

describe("class Edit", () => {
  let sandbox;
  let quizesDeleteOne;
  let quizesUpdateOne;
  let questionsDeleteMany;
  let questionsUpdateMany;
  let answersDeleteMany;
  let answersUpdateMany;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    quizesDeleteOne = sandbox.stub(DatabaseQuizes, "deleteOne");
    quizesUpdateOne = sandbox.stub(DatabaseQuizes, "updateOne");
    questionsDeleteMany = sandbox.stub(DatabaseQuestions, "deleteMany");
    questionsUpdateMany = sandbox.stub(DatabaseQuestions, "updateMany");
    answersDeleteMany = sandbox.stub(DatabaseAnswers, "deleteMany");
    answersUpdateMany = sandbox.stub(DatabaseAnswers, "updateMany");
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".quiz", () => {
    it("should delete a quiz from the database", async () => {
      sandbox.stub(Edit, "questions");

      await Edit.quiz(updateDeletions, quiz);

      expect(quizesDeleteOne.callCount).equal(1);
    });

    it("should update a quiz in the database", async () => {
      sandbox.stub(Edit, "questions");

      await Edit.quiz(updateChanges, quiz);

      expect(quizesUpdateOne.callCount).equal(1);
    });

    it("should not update a quiz in the database (no change)", async () => {
      sandbox.stub(Edit, "questions");

      await Edit.quiz(updateNoChanges, quiz);

      expect(quizesUpdateOne.callCount).equal(0);
    });
  });

  describe(".questions", () => {
    it("should delete a question(s) from the database", async () => {
      sandbox.stub(Add, "questions");
      sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateDeletions, quiz);

      expect(questionsDeleteMany.callCount).equal(1);
    });

    it("should not delete a question(s) from the database (no changes)", async () => {
      sandbox.stub(Add, "questions");
      sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateNoChanges, quiz);

      expect(questionsDeleteMany.callCount).equal(0);
    });

    it("should update a question(s) in the database", async () => {
      sandbox.stub(Add, "questions");
      sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateChanges, quiz);

      expect(questionsUpdateMany.callCount).equal(1);
    });

    it("should not update a question(s) in the database (no changes)", async () => {
      sandbox.stub(Add, "questions");
      sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateNoChanges, quiz);

      expect(questionsUpdateMany.callCount).equal(0);
    });

    it("should call Add.questions to add a question(s) and an answer(s) to the database", async () => {
      const add = sandbox.stub(Add, "questions");
      sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateChanges, quiz);

      expect(add.callCount).equal(1);
    });

    it("should call Add.answers to add an answer(s) to the database", async () => {
      sandbox.stub(Add, "questions");
      const add = sandbox.stub(Add, "answers");
      sandbox.stub(Edit, "answers");

      await Edit.questions(updateChanges, quiz);

      expect(add.callCount).equal(1);
    });
  });

  describe(".answers", () => {
    it("should delete an answer(s) from the database", async () => {
      await Edit.answers(Object.keys(updateDeletions), updateDeletions, quiz);

      expect(answersDeleteMany.callCount).equal(1);
    });

    it("should not delete an answer(s) from the database (no changes)", async () => {
      await Edit.answers(Object.keys(updateNoChanges), updateNoChanges, quiz);

      expect(answersDeleteMany.callCount).equal(0);
    });

    it("should update an answer(s) in the database", async () => {
      await Edit.answers(Object.keys(updateChanges), updateChanges, quiz);

      expect(answersUpdateMany.callCount).equal(1);
    });

    it("should not update an answer(s) in the database (no changes)", async () => {
      await Edit.answers(Object.keys(updateNoChanges), updateNoChanges, quiz);

      expect(answersUpdateMany.callCount).equal(0);
    });
  });
});
