const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    const connection = new Pool({
      database: process.env.DBCDATABASE,
      host: process.env.DBCHOST,
      password: process.env.DBCPASSWORD,
      port: process.env.DBCPORT,
      user: process.env.DBCUSER
    })
    const result = await connection.query(string, argument)
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
