const DatabaseConnection = require('../../db/database-connection')

class DatabaseLogIn {
  static async authenticate (username) {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN permissions
      ON people.permissionid = permissions.id
      
      WHERE username = $1
    `, [username])
  }
}

module.exports = DatabaseLogIn
