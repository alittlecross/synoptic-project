import DatabaseConnection from "../../db/database-connection.js";

class DatabaseAnswers {
  static async addMany(string) {
    return DatabaseConnection.query(`
      INSERT INTO answers (answer, correct, questionid)
      VALUES (${string});
    `);
  }

  static async deleteMany(string) {
    return DatabaseConnection.query(`
      DELETE FROM answers

      WHERE id IN (${string});
    `);
  }

  static async updateMany(string) {
    return DatabaseConnection.query(`
      INSERT INTO answers (id, answer, correct, questionid)
      VALUES (${string})
      ON CONFLICT (id) DO UPDATE
        SET 
          answer = EXCLUDED.answer,
          correct = EXCLUDED.correct;
    `);
  }
}

export default DatabaseAnswers;
