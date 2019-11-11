CREATE TABLE answers (
  id serial PRIMARY KEY,
  answer varchar(140) NOT NULL,
  correct boolean NOT NULL DEFAULT false,
  createdat timestamptz NOT NULL DEFAULT NOW(),

  questionid int NOT NULL,
  FOREIGN KEY (questionid) REFERENCES questions(id)
);
