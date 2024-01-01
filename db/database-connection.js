import pg from "pg";

class DatabaseConnection {
  static async query(string, argument = null) {
    const connection = new pg.Pool({
      database: process.env.DBCDATABASE || "quiz_manager",
      host: process.env.DBCHOST,
      password: process.env.DBCPASSWORD,
      port: process.env.DBCPORT,
      user: process.env.DBCUSER,
    });
    const result = await connection.query(string, argument);
    await connection.end();
    return result;
  }
}

export default DatabaseConnection;
