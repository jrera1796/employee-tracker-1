const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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

db.connect(function(err) {
    if (err) throw err;
   
    promptUser();
  });


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

            case 'quit':
            break;    
         }
    })
};

function allEmployees(){
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function allDepartements(){
    const sql = `SELECT * FROM department`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function allRoles(){
    const sql = `SELECT * FROM role`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function addDepartement(){

}

function addEmployee(){

}

function addRole(){

}

function updateRole(){

}
