const DatabaseConnection = require('../../db/database-connection')

class DatabaseQuizes {
  static async getAll () {
    return DatabaseConnection.query(`
      SELECT id AS quizid, name
      FROM quizes;
    `)
  }
}

module.exports = DatabaseQuizes
