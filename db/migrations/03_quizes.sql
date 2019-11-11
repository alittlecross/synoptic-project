CREATE TABLE quizes (
  id serial PRIMARY KEY,
  name varchar(140) NOT NULL,
  createdat timestamptz NOT NULL DEFAULT NOW()
);
