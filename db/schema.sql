DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;



CREATE TABLE department (
  id INTEGER PRIMARY KEY,
  name VARCHAR (30)
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL (6,2),
  department_id INTEGER
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INTEGER,
  manager_id INTEGER NULL
);