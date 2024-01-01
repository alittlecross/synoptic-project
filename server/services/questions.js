import DatabaseConnection from "../../db/database-connection.js";

class DatabaseQuestions {
  static async addMany(string) {
    return DatabaseConnection.query(`
      INSERT INTO questions (question, quizid)
      VALUES (${string})

      RETURNING id;
    `);
  }

  static async deleteMany(string) {
    return DatabaseConnection.query(`
      DELETE FROM questions

      WHERE id IN (${string});
    `);
  }

  static async updateMany(string) {
    return DatabaseConnection.query(`
      INSERT INTO questions (id, question, quizid) 
      VALUES (${string})
      ON CONFLICT (id) DO UPDATE 
        SET 
          question = EXCLUDED.question;
    `);
  }
}

export default DatabaseQuestions;
