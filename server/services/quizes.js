import DatabaseConnection from "../../db/database-connection.js";

class DatabaseQuizes {
  static async getAll() {
    return DatabaseConnection.query(`
      SELECT id AS quizid, name
      FROM quizes
      ORDER BY id;
    `);
  }

  static async getOne(id) {
    return DatabaseConnection.query(
      `
      SELECT
        'quiz' AS kind,
        name,
        id AS quizid,
        '' AS question,
        0 AS questionid,
        '' AS answer,
        0 AS answerid,
        FALSE AS correct
      FROM quizes
      WHERE id=$1
    
      UNION
    
      SELECT
        'question' AS kind,
        '' AS name,
        quizid,
        question,
        id AS questionid,
        '' AS answer,
        0 AS answerid,
        FALSE AS correct
      FROM questions
      WHERE quizid=$1
    
      UNION
    
      SELECT
        'answer' AS kind,
        '' AS name,
        0 AS quizid,
        '' question,
        questions.id AS questionid,
        answer,
        answers.id AS answerid,
        correct
        
      FROM quizes
      INNER JOIN questions ON quizes.id=questions.quizid
      INNER JOIN answers ON questions.id=answers.questionid
      WHERE quizes.id=$1
      
      ORDER BY kind DESC, quizid, questionid, answerid;
    `,
      [id]
    );
  }

  static async addOne(name) {
    return DatabaseConnection.query(
      `
      INSERT INTO quizes (name)
      VALUES
        ($1)
      
      RETURNING id;
    `,
      [name]
    );
  }

  static async deleteOne(id) {
    return DatabaseConnection.query(
      `
      DELETE FROM quizes

      WHERE id = $1;
    `,
      [id]
    );
  }

  static async updateOne(name, id) {
    return DatabaseConnection.query(
      `
      UPDATE quizes
      SET
        name = $1
      
      WHERE id = $2;
    `,
      [name, id]
    );
  }
}

export default DatabaseQuizes;
