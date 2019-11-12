const DatabaseConnection = require('../../db/database-connection')

class DatabaseQuizes {
  static async getAll () {
    return DatabaseConnection.query(`
      SELECT id AS quizid, name
      FROM quizes
      ORDER BY id;
    `)
  }

  static async getOne (id) {
    return DatabaseConnection.query(`
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
    `, [id])
  }
}

module.exports = DatabaseQuizes
