CREATE TABLE questions (
  id serial PRIMARY KEY,
  question varchar(280) NOT NULL,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  
  quizid int NOT NULL,
  FOREIGN KEY (quizid) REFERENCES quizes(id)
);
