const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Password',
      database: 'trackemployees'
    },
    console.log('Connected to the trackemployees database.')
);


function promptUser() {
    return inquirer.prompt([
    {
    type: 'list',
    message: 'Select an action:',
    name: 'action',
    choices: [
            'view all employees', 
            'view all departements',
            'view all roles',
            'add departement',
            'add role',
            'add employee',
            'update employee role',
            'quit'
            ]
    }
]).then(function(answers) {
        switch (answers.action) {
            case 'view all employees':
                allEmployees();
            break;

            case 'view all departements':
                allDepartements();
            break;

            case 'view all roles':
                allRoles();
            break;
                
            case 'add departement':
                addDepartement();
            break;

            case 'add role':
                addRole();
            break;

            case 'add employee':
                addEmployee();
            break;

            case 'update employee role':
                updateRole();
            break;
         }
    })
};