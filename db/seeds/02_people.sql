INSERT INTO people (id, username, password, permissionid)
VALUES
  (1, 'edit@email.com', 'password', 1),
  (2, 'view@email.com', 'password', 2),
  (3, 'restricted@email.com', 'password', 3);

SELECT setval('people_id_seq', (SELECT max(id) FROM people));
