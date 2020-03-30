const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const cTable = require('console.table');
const Query  = require('./Query/query');
const query = new Query();

// query.update('role', [
//     {
//         title: 'nn',
//         salary: 22,
//         department_id: 1
//     },
//     {
//         id: 4
//     }
// ],
// data => console.log(data));
// query.select('*','employee',data => console.table(data));

// query.insert('role',
// {
//     title: 'anaesthesiologist',
//     salary: 150000.33,
//     department_id: 4,
// },
// data => console.log(data));

// query.update('role', [
//     {
//         title: 'school'
//     },
//     {
//         department_id : 4
//     }
// ],
// data => console.log(data));

// query.delete('employee',
// {
//     id: 7
// },
// data => console.log(data));



// query.select('*','role',data => console.table(data)) ;
// query.select('first_name, last_name','employee',data => console.table(data)) 
// query.select('*','department',data => console.table(data)) ;

// let x = {
//     choices: 'Update departments, roles, employees',
//     updateChoices: 'Update Roles',
//     auColRole: [ 'Title', 'Salary', 'Department ID' ],
//     title: 'moddoo',
//     salary: '333',
//     departId: '2',
//     uColRoleChoice: 'Department ID',
//     uColData: '4'
// }
// let y = Object.entries(x).filter(el => el[0] == 'title' || el[0] == 'salary' || el[0] == 'departId' );
// let z = {};
// for(el of y) {
//     console.log(el[0]);
//     z[el[0]] = el[1]
// };
// console.log(Object.entries(x))
// console.log(y)
// console.log(z)

connection.query('SELECT * FROM employee 
                  WHERE ?
') 