import bcrypt from "bcrypt";
import DatabaseLogIn from "../services/people.js";

class LogIn {
  constructor() {
    this.success = false;
    this.user = {
      id: 0,
      permission: "",
    };
  }

  static async authenticate(data) {
    const output = new LogIn();
    const result = await DatabaseLogIn.authenticate(data.username);
    const row = result.rows[0];

    if (
      result.rowCount === 1 &&
      bcrypt.compareSync(data.password, row.password)
    ) {
      output.success = true;
      output.user.id = row.id;
      output.user.permission = row.permission;
    }

    return output;
  }
}

export default LogIn;
