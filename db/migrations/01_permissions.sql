CREATE TABLE permissions (
  id serial PRIMARY KEY,
  permission varchar(35) UNIQUE NOT NULL,
  createdat timestamptz NOT NULL DEFAULT NOW()
);
