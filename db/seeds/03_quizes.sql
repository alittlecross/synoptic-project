INSERT INTO quizes (id, name)
VALUES
  (1, 'Geography'),
  (2, 'Maths'),
  (3, 'Science');

SELECT setval('quizes_id_seq', (SELECT max(id) FROM quizes));