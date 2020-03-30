USE employees_db;

INSERT INTO department (name) 
VALUES ('Marketing'),
       ('HR'),
       ('IT'),
       ('Medical'),
       ('Webdeveloper'),
       ('Sanitation'),
       ('Construction'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Junior Developer', 25000.99, 5),
       ('Pediatric', 100000.00, 4),
       ('Obstetrician', 200000.00, 4),
       ('Senior Developer', 55000.00, 5),
       ('HR specialist', 35000.00, 2),
       ('Engineer', 60000.55, 7),
       ('Marketing specialist', 45000.00, 1),
       ('Dentist', 80000.77, 4),
       ('Manager', 200000.00,8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmed', 'Eldemerdash', 9, default),
       ('Amr', 'Elghannam', 9, default),
       ('Dina', 'Keshta', 8, 2),
       ('Amir', 'Badr', 5, 1),
       ('Mustafa', 'Ammar', 7, 1),
       ('Rana', 'Mahdi', 2, 2),
       ('Eman', 'Rady', 1, 1),
       ('Rawan', 'Kiwi', 4, 2),
       ('Nany', 'Zako', 1, 2),
       ('abdelmoneim', 'mohamed', 6, 2)