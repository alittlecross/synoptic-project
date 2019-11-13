const DatabaseConnection = require('../../db/database-connection')

class DatabaseAnswers {
  static async addMany (string) {
    return DatabaseConnection.query(`
      INSERT INTO answers (answer, correct, questionid)
      VALUES (${string});
    `)
  }
}

module.exports = DatabaseAnswers
