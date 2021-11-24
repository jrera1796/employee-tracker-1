INSERT INTO departments (id, name)
VALUES
  (1, 'Departement 1'),
  (2, 'Departement 2'),
  (3, 'Departement 3'),
  (4, 'Departement 4');



INSERT INTO roles (title, salary, department_id)
VALUES
  ('title 1', 1000, 1),
  ('title 2', 2000, 3),
  ('title 3', 3000, 1),
  ('title 4', 4000, 2),
  ('title 5', 5000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 1),
  ('Jack', 'London', 2, 2),
  ('Robert', 'Bruce', 3, 3),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 5, 2),
  ('Paolo', 'Pasolini', 6, 1),
  ('Heathcote', 'Williams', 4, 3),
  ('Sandy', 'Powell', 3, 3),
  ('Emil', 'Zola', 6, 2),
  ('Sissy', 'Coalpits', 3, null),
  ('Antoinette', 'Capet', 2, 1),
  ('Samuel', 'Delany', 5, 2),
  ('Tony', 'Duvert', 2, null),
  ('Dennis', 'Cooper', 1, 3),
  ('Monica', 'Bellucci', 4, null);
 
