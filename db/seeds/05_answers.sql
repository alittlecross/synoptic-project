INSERT INTO answers (id, answer, correct, questionid)
VALUES 
  (1, 'Europe', false, 1),
  (2, 'South America', false, 1),
  (3, 'Europe', true, 2),
  (4, 'South America', false, 2),
  (5, '6', false, 3),
  (6, '9', true, 3),
  (7, '6', false, 4),
  (8, '9', true, 4),
  (9, '343 m/s', true, 5),
  (10, '299,792,458 m/s', true, 5),
  (11, '343 m/s', true, 6),
  (12, '299,792,458 m/s', true, 6);

SELECT setval('answers_id_seq', (SELECT max(id) FROM answers)); 
