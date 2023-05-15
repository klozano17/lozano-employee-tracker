const inquirer = require('inquirer');
const mysql = require('mysql12');
const cTable = require('console.table');

//creating connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db',
},

console.log(`Connected to the courses_db database.`),

);

function mainMenu() {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'Add an employee',
                'Add a role',
                'Add a department',
                'Update an employee role',
            ],
            },
        ])
        .then((answers) => {
        // TODO: Implement logic for each option
        });
    }

    function viewEmployees() {
        connection.query('SELECT * FROM employees', (err, res) => {
            if (err) throw err;
            console.table(res);
            mainMenu();
        });
        }

    function addEmployee() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the employee\'s role ID:',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the employee\'s manager ID (leave blank if none):',
            },
            ])
            .then((answers) => {
    
            connection.query(
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [answers.firstName, answers.lastName, answers.roleId, answers.managerId || null],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${answers.firstName} ${answers.lastName} added to the database`);
                    mainMenu();
                }
            );
            });
        }
