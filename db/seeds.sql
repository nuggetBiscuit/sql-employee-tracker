-- Puts department names into department table
INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

-- Puts employee jobs into jobs table
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Software Engineer', 95000, 1),
  ('Salesperson', 70000, 2),
  ('Accountant', 119000, 3),
  ('Lawyer', 195000, 4);

-- Puts employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Martinez', 1, 4),
    ('Emma', 'Taylor', 2, 3),
    ('Aiden', 'Brown', 3, 1),
    ('Lila', 'Wilson', 4, 5);