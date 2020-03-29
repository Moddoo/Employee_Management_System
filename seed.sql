USE employees_db;

INSERT INTO department (name) 
VALUES ('Marketing'),
       ('HR'),
       ('IT'),
       ('Medical'),
       ('Webdeveloper'),
       ('Sanitation'),
       ('Construction');

INSERT INTO role (title, salary, department_id)
VALUES ('Junior Developer', 25000.99, 5),
       ('Pediatric', 100000.00, 4),
       ('Obstetrician', 200000.00, 4),
       ('Senior Developer', 55000.00, 5),
       ('HR specialist', 35000.00, 2),
       ('Engineer', 60000.55, 7),
       ('Marketing specialist', 45000.00, 1),
       ('dentist', 80000.77, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmed', 'Eldemerdash', 3, DEFAULT),
       ('Amr', 'Elghannam', 6, 3),
       ('Dina', 'Keshta', 8, 2),
       ('Amir', 'Badr', 5, 4),
       ('Mustafa', 'Ammar', 7, 1),
       ('Rana', 'Mahdi', 2, 7),
       ('Eman', 'Rady', 1, 6),
       ('Rawan', 'Kiwi', 4, 9);