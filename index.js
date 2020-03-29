const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const cTable = require('console.table');
const Query  = require('./Query/query');
const query = new Query();

questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'Choose One Option From The List?',
        choices: [
             'View departments, roles, employees',
             'Add departments, roles, employees',
             'Update departments, roles, employees',
             'Delete departments, roles, employees' 
                 ],         
    },
    {
        type: 'list',
        name: 'viewChoices',
        message: 'Choose One Option From The List?',
        choices: [
             'View Departments','View Roles', 'View Employees'
                 ],
        when: ans => ans.choices === 'View departments, roles, employees',
    },
    {
        type: 'input',
        name: 'show',
        when:  ans => {
                switch(ans.viewChoices) {
                case 'View Departments': 
                query.select('*','department',data => console.table(data));
                query.connection.end();
                break;
                case 'View Roles': 
                query.select('*','role',data => console.table(data));
                query.connection.end();
                break;
                case 'View Employees': 
                query.select('*','employee',data => console.table(data));
                query.connection.end();
                break;
            }
        }
    },
    {
        type: 'list',
        name: 'addChoices',
        message: 'Choose One Option From The List?',
        choices: [
             'Add Departments','Add Roles', 'Add Employees'
                 ],
        when: ans => ans.choices === 'Add departments, roles, employees'
    },
    {
        type: 'list',
        name: 'updateChoices',
        message: 'Choose One Option From The List?',
        choices: [
             'Update Departments','Update Roles', 'Update Employees'
        ],
        when: ans => ans.choices === 'Update departments, roles, employees'
    },
    {
        type: 'list',
        name: 'deleteChoices',
        message: 'Choose One Option From The List?',
        choices: [
             'Delete Departments','Delete Roles', 'Delete Employees', 'Delete All'
        ],
        when: ans => ans.choices === 'Delete departments, roles, employees'
    },
    {
        type: 'input',
        name: 'audDepartment',
        message: 'What IS The Departmant Name?',
        when: ans => ans.addChoices === 'Add Departments' ||
                     ans.updateChoices === 'Update Departments' ||
                     ans.deleteChoices === 'Delete Departments'
    },
    {
        type: 'input',
        name: 'setDepartment',
        message: 'What IS The New Departmant Name?',
        when: ans => ans.updateChoices === 'Update Departments'
    },
    {
        type: 'checkbox',
        name: 'auColRole',
        message: 'Choose At Least One Option?',
        choices: [
            new inquirer.Separator(' *** Role Columns *** '),
             'Title','Salary','Department ID'
                 ],
        when:  ans =>  ans.addChoices === 'Add Roles' ||
                     ans.updateChoices === 'Update Roles',      
    },
    {
        type: 'input',
        name: 'title',
        message: 'What Is The New Title Name?',
        when:  ans => {
            if (ans.auColRole) {
                if(ans.auColRole.indexOf('Title') != -1) return true;
            }
        }  
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What Is The New Salary?',
        when: ans =>  {
            if (ans.auColRole) {
                if(ans.auColRole.indexOf('Salary') != -1) return true;
            }
        }
    },
    {
        type: 'input',
        name: 'department_Id',
        message: 'What Is The New Department ID?',
        when: ans => {
            if (ans.auColRole) {
                if(ans.auColRole.indexOf('Department ID') != -1) return true;
            }
        } 
    },
    {
        type: 'list',
        name: 'uColRoleChoice' ,
        message: 'Select A Column To Help Us Target The Row You Want To Change?',
        choices: ['title','salary','department_id'],
        when:  ans => ans.updateChoices === 'Update Roles' ||
                      ans.deleteChoices === 'Delete Roles'
    },
    {
        type: 'checkbox',
        name: 'auColEmployee',
        message: 'Choose At Least One Option?',
        choices: [
            new inquirer.Separator(' *** Employee Columns *** '),
             'First_Name','Last_Name','Role ID','Manager ID'
                 ],
        when: ans => ans.addChoices === 'Add Employees' ||
                     ans.updateChoices === 'Update Employees' 
    },
    {
        type: 'input',
        name: 'first_name',
        message: 'What Is The New First Name?',
        when:  ans => {
            if(ans.auColEmployee) {
                if(ans.auColEmployee.indexOf('First_Name') !== -1) return true;
            }
        }  
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What Is The New Last Name?',
        when:  ans => {
            if(ans.auColEmployee) {
                if(ans.auColEmployee.indexOf('Last_Name') !== -1) return true;
            }
        } 
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What Is The New Role ID?',
        when:  ans => {
            if(ans.auColEmployee) {
                if(ans.auColEmployee.indexOf('Role ID') !== -1) return true;
            }
        } 
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What Is The New Manager ID?',
        when:  ans => {
            if(ans.auColEmployee) {
                if(ans.auColEmployee.indexOf('Manager ID') !== -1) return true;
            }
        } 
    },
    {
        type: 'list',
        name: 'uColEmployeeChoice' ,
        message: 'Select A Column To Help Us Target The Row You Want To Change?',
        choices: ['first_name','last_name','role_id','manager_id'],
        when:  ans => ans.updateChoices === 'Update Employees' ||
                      ans.deleteChoices === 'Delete Employees'
    },
    {
        type: 'input',
        name: 'uColData',
        message: 'Write Accurate Data For The Selected Column To (Update,Delete) The Row ==>',
        when: ans => ans.uColRoleChoice ||
                     ans.uColEmployeeChoice
    },
    {
        type: 'list',
        name: 'delete' ,
        message: 'Select A Table To Delete ==>',
        choices: ['department','role','employee'],
        when:  ans => ans.deleteChoices === 'Delete All'
    }
];

inquirer.prompt(questions)
        .then(ans => {
    console.log(ans);
        if(ans.addChoices) {
            switch(ans.addChoices) {
                case 'Add Departments': 
                query.insert('department',{
                    name: ans.audDepartment
                },
                data => console.log(data));
                query.select('*','department',data => console.table(data));
                query.connection.end();
                break;
                case 'Add Roles':
                query.insert('role',{
                    title: ans.title,
                    salary: ans.salary,
                    department_id: ans.departId
                },
                data => console.log(data));
                query.select('*','role',data => console.table(data));
                query.connection.end();
                break;    
                case 'Add Employees':
                query.insert('employee',{
                    first_name: ans.firstName,
                    last_name: ans.lastName,
                    role_id: ans.roleId,
                    manager_id: ans.managerId
                },
                data => console.log(data));
                query.select('*','employee',data => console.table(data));
                query.connection.end();
                break;    
            }
        };


        if(ans.updateChoices) {
            switch(ans.updateChoices) {
                case 'Update Departments':
                    query.update('department',[
                        {   
                            name: ans.setDepartment
                        },
                        {
                            name: ans.audDepartment
                        }
                    ],
                    data => console.log(data));
                    query.select('*','department',data => console.table(data));
                    query.connection.end();
                    break;
                case 'Update Roles':
                    let arr = Object.entries(ans);
                    let roleColumnsArr = arr.filter(el => el[0] === 'title' || el[0] === 'salary' || el[0] === 'department_Id' );
                    let roleColumnsObj = {};
                    for(let el of roleColumnsArr) {roleColumnsObj[el[0]] = el[1]};
                    query.update('role',[roleColumnsObj,{[ans.uColRoleChoice]: ans.uColData}],data => console.log(data));
                    query.select('*','role',data => console.table(data));
                    query.connection.end();
                    break;
                case 'Update Employees':
                    let arrE = Object.entries(ans);
                    let empColumnsArr = arrE.filter(el => el[0] === 'first_name' || el[0] === 'last_name' || el[0] === 'role_id' || el[0] === 'manager_id');
                    let empColumnsObj = {};
                    for(let el of empColumnsArr) {empColumnsObj[el[0]] = el[1]};
                    query.update('employee',[empColumnsObj,{[ans.uColEmployeeChoice]: ans.uColData}],data => console.log(data));
                    query.select('*','employee',data => console.table(data));
                    query.connection.end();
                    break;
            }
        }

        
        if(ans.deleteChoices) {
            switch(ans.deleteChoices) {
                case 'Delete Departments':
                    query.delete('department',
                    {
                        name: ans.audDepartment
                    },
                    data => console.log(data));
                    query.select('*','department',data => console.table(data));
                    query.connection.end();
                    break;
                case 'Delete Roles':
                    query.delete('role',
                    {
                        [ans.uColRoleChoice]: ans.uColData
                    },
                    data => console.log(data));
                    query.select('*','role',data => console.table(data));
                    query.connection.end();
                    break;
                case 'Delete Employees':
                    query.delete('employee',
                    {
                        [ans.uColEmployeeChoice]: ans.uColData
                    },
                    data => console.log(data));
                    query.select('*','employee',data => console.table(data));
                    query.connection.end();
                    break;
                case 'Delete All':
                    query.deleteAll(ans.delete,data => console.log(data));
                    query.select('*',ans.delete,data => console.table(data));
                    query.connection.end();
                    break;
            }
        }
})
 