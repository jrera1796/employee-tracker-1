DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;




CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR (30)
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL (6,2),
  department_id INTEGER,
--   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INTEGER,
  manager_id INTEGER NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
--   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);