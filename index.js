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
            'delete role',
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

            case 'delete role':
                deleteRole();
            break;    

            case 'quit':
                db.end();
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
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function allRoles(){
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function addDepartement(){
    return inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'what is the name of the departement?'
        },
        {
            name: 'id',
            type: 'input',
            message: 'what is the id of the departement?'
        }

    ]).then(answers => {
            const sql = `INSERT INTO departments (id, name) VALUES (?,?)`;
            const params = [answers.id, answers.name]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                // console.table(res);
                promptUser();
            }
        )
    })
}

function addEmployee(){
    return inquirer.prompt([
        {
          name: 'firstname',
          type: 'input',
          message: 'what is the first name of the employee?'
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'what is the last name of the employee?'
        },
        {
            name: 'roleid',
            type: 'input',
            message: 'what is the role id of the employee?'
        },
        {
            name: 'managerid',
            type: 'input',
            message: 'what is the manager id of the employee?'
        }

    ]).then(answers => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [answers.firstname, answers.lastname, answers.roleid, answers.managerid]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                // console.table(answers);
                promptUser();
            }
        )
    })
}

function addRole(){
    return inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'what is the title of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'what is the salary of the role?'
        },
        {
            name: 'departementid',
            type: 'input',
            message: 'what is the departement id of the role?'
        }

    ]).then(answers => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            const params = [answers.title, answers.salary, answers.departementid]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                // console.table(answers);
                promptUser();
            }
        )
    })
}

function updateRole(){
   const sql = `SELECT * FROM employee ORDER BY last_name`;
   db.query(sql, (err, res) => {
       if (err) throw err
       const employee = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`,
      }));
    //    console.log(employee)
            return inquirer.prompt([
            {
                name: 'title',
                type: 'list',
                message: 'select employee to update their role',
                choices: employee
            },
        ]).then(answers => {
            // console.log(answers)
            const sql = `SELECT * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) throw err
                    const role = res.map(({ id, title, salary }) => ({
                    value: id,
                    title: `${title}`,
                    salary: `${salary}`,
                    name: `${title}`,
                }));
                // console.log(role)
                return inquirer.prompt([
                    {
                    type: 'list',
                    name: 'role',
                    message: 'select role',
                    choices: role,
                    }
                ]).then(ans =>{
                        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                        const params = [ans.role, answers.title]
                        // console.log(answers.title)
                        // console.log(ans.role)
                        db.query(sql, params, (err, res) => {
                          if (err) throw err;
                          promptUser();
                        });
                })
            })
        })
    }
)}


function deleteRole(){
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err
            const role = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`,
            name: `${title}`,
        }));
        // console.log(role)
        return inquirer.prompt([
            {
            type: 'list',
            name: 'role',
            message: 'select role to delete',
            choices: role,
            }
        ]).then(ans =>{
                const sql = `DELETE FROM roles WHERE id = ?`;
                const params = [ans.role]
                // console.log(answers.title)
                // console.log(ans.role)
                db.query(sql, params, (err, res) => {
                  if (err) throw err;
                  promptUser();
                });
        })
    })
}