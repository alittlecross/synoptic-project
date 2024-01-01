/* eslint-disable no-console */

import fs from "fs";
import DatabaseConnection from "./database-connection.js";

class Scripts {
  static async updateTable(table, script) {
    await DatabaseConnection.query(`
      INSERT INTO ${table} (script)
      VALUES ('${script}');
    `);
  }

  static async scriptAlreadyRan(table, script) {
    const result = await DatabaseConnection.query(`
      SELECT *
      FROM ${table}
      WHERE script = '${script}';
    `);
    return result.rowCount === 0;
  }

  static async tableExists(table) {
    const result = await DatabaseConnection.query(`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = '${table}'
      );
    `);
    return result.rows[0].exists;
  }

  static async createTable(table) {
    if (!(await Scripts.tableExists(table))) {
      await DatabaseConnection.query(`
        CREATE TABLE ${table} (
          id SERIAL PRIMARY KEY,
          script varchar(50),
          createdat timestamptz NOT NULL DEFAULT NOW()
        );
      `);
      console.log(`${table} 00_${table}.sql`);
    }
  }

  static async run(type) {
    await Scripts.createTable(type);
    const directory = `./db/${type}/`;
    const scripts = [];
    fs.readdirSync(directory).forEach((file) => {
      scripts.push(file);
    });
    for (const script of scripts) {
      if (await Scripts.scriptAlreadyRan(type, script)) {
        const sql = fs.readFileSync(directory + script).toString();
        await DatabaseConnection.query(sql);
        await Scripts.updateTable(type, script);
        console.log(`${type} ${script}`);
      }
    }
  }
}

export default Scripts;
