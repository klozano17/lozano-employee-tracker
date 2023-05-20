-- Departments table
INSERT INTO departments (name) 
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Marketing'),
('Legal');

-- Roles table
INSERT INTO roles (title, salary, departments_id) 
VALUES
('Salesperson', 50000, 1),
('Sales Lead', 75000, 1),
('Software Engineer', 100000, 2),
('Lead Software Engineer', 150000, 2),
('Accountant', 65000, 3),
('Finance Manager', 100000, 3),
('Marketing Manager', 90000, 4),
('Graphic Designer', 60000, 4),
('Lawyer', 120000, 5),
('Legal Assistant', 40000, 5);

-- Employees table
INSERT INTO employees (first_name, last_name, roles_id, managers_id) 
VALUES
('John', 'Doe', 3, NULL),
('Jane', 'Doe', 2, 1),
('Bob', 'Smith', 4, NULL),
('Alice', 'Johnson', 6, 3),
('Tim', 'Jones', 7, 3),
('Sarah', 'Lee', 8, 4),
('Mike', 'Johnson', 9, 5),
('Tom', 'Brown', 10, 5);
