const DatabaseLogIn = require('../services/log-in')

class LogIn {
  constructor () {
    this.success = false
    this.user = {
      id: 0,
      permission: ''
    }
  }

  static async authenticate (data) {
    const output = new LogIn()
    const result = await DatabaseLogIn.authenticate(data.username)
    const row = result.rows[0]

    if (result.rowCount === 1 && data.password === row.password) {
      output.success = true
      output.user.id = row.id
      output.user.permission = row.permission
    }

    return output
  }
}

module.exports = LogIn
