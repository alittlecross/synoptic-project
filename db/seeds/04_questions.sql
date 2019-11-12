INSERT INTO questions (id, question, quizid)
VALUES 
  (1, 'Bolivia is in which continent?', 1),
  (2, 'Bulgaria is in which continent?', 1),
  (3, 'What is 3 + 3?', 2),
  (4, 'What is 3 x 3?', 2),
  (5, 'What is the speed of sound?', 3),
  (6, 'What is the speed of light?', 3);

SELECT setval('questions_id_seq', (SELECT max(id) FROM questions));
