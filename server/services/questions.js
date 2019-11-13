const DatabaseConnection = require('../../db/database-connection')

class DatabaseQuestions {
  static async addMany (string) {
    return DatabaseConnection.query(`
      INSERT INTO questions (question, quizid)
      VALUES (${string})

      RETURNING id;
    `)
  }
}

module.exports = DatabaseQuestions
