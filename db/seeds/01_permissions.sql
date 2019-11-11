INSERT INTO permissions (id, permission)
VALUES
  (1, 'edit'),
  (2, 'view'),
  (3, 'restricted');

SELECT setval('permissions_id_seq', (SELECT max(id) FROM permissions));
