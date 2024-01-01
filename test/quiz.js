import sinon from "sinon";
import { expect } from "chai";
import { dbGetAll, dbGetOne } from "./support.js";

import Quiz from "../server/lib/quiz.js";
import DatabaseQuizes from "../server/services/quizes.js";

import Question from "../server/lib/question.js";
import Answer from "../server/lib/answer.js";

describe("class Quiz", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(".constructor", () => {
    it("should create a Quiz object", async () => {
      const result = new Quiz(dbGetAll.rows[0]);

      expect(result instanceof Quiz).equal(true);
      expect(result.id).equal(1);
      expect(result.name).equal("Quiz One");
      expect(result.questions).to.be.an("array");
    });
  });

  describe(".list", () => {
    it("should query the database for all quizes", async () => {
      const getAll = sandbox.stub(DatabaseQuizes, "getAll").returns(dbGetAll);

      await Quiz.list();

      expect(getAll.callCount).equal(1);
    });

    it("should return an array of Quiz objects", async () => {
      sandbox.stub(DatabaseQuizes, "getAll").returns(dbGetAll);

      const result = await Quiz.list();

      expect(result).to.be.an("array");
      expect(result[0] instanceof Quiz).equal(true);
    });
  });

  describe(".getOne", () => {
    it("should query the database for a quiz", async () => {
      const getOne = sandbox.stub(DatabaseQuizes, "getOne").returns(dbGetOne);

      await Quiz.getOne(1);

      expect(getOne.callCount).equal(1);
    });

    it("should return a Quiz object", async () => {
      sandbox.stub(DatabaseQuizes, "getOne").returns(dbGetOne);

      const result = await Quiz.getOne(1);

      expect(result instanceof Quiz).equal(true);
      expect(result.questions[0] instanceof Question).equal(true);
      expect(result.questions[0].answers[0] instanceof Answer).equal(true);
    });
  });
});
