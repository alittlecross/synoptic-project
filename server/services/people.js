import DatabaseConnection from "../../db/database-connection.js";

class DatabaseLogIn {
  static async authenticate(username) {
    return DatabaseConnection.query(
      `
      SELECT *
      FROM people
      INNER JOIN permissions
      ON people.permissionid = permissions.id
      
      WHERE username = $1
    `,
      [username]
    );
  }
}

export default DatabaseLogIn;
