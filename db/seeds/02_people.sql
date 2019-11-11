INSERT INTO people (id, username, password, permissionid)
VALUES
  (1, 'edit@email.com', '$2b$10$2mQcfZHsglfEFQQ8lqJnVefPyVvFlciCsVucezl5SXBgYvdhlCppW', 1),
  (2, 'view@email.com', '$2b$10$2mQcfZHsglfEFQQ8lqJnVefPyVvFlciCsVucezl5SXBgYvdhlCppW', 2),
  (3, 'restricted@email.com', '$2b$10$2mQcfZHsglfEFQQ8lqJnVefPyVvFlciCsVucezl5SXBgYvdhlCppW', 3);

SELECT setval('people_id_seq', (SELECT max(id) FROM people));
