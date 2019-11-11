CREATE TABLE people (
  id serial PRIMARY KEY,
  username varchar(70) UNIQUE NOT NULL,
  password varchar(140) NOT NULL,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  
  permissionid int NOT NULL,
  FOREIGN KEY (permissionid) REFERENCES permissions(id)
);
