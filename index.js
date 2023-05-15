const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");
//const queries = require('./queries/queries.js');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    User: "root",
    password: "Eliasramon2020!",
    database: "employee_db",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the employee database.");
    mainMenu();
});

function mainMenu() {
    return inquirer.prompt([
        {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add an employee",
            "Add a role",
            "Add a department",
            "Update an employee role",
        ],
        },
    ])
    .then((answers) => {
        switch (answers.option) {
            case "View all employees":
                viewEmployees();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all departments":
                viewDepartments();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
            default:
                console.log("Invalid option");
                break;
        }
    });
}


function viewEmployees() {
    db.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles() {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewDepartments() {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}


function addEmployee() {
    inquirer.prompt([
    {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
    },
    {
        type: "input",
        name: "roleId",
        message: "Enter the employee's role ID:",
    },
    {
        type: "input",
        name: "managerId",
        message: "Enter the employee's manager ID (leave blank if none):",
    },
    ])
    .then((answers) => {
        db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId || null,
        ],
        (err, res) => {
            if (err) throw err;
            console.log(
            `${answers.firstName} ${answers.lastName} added to the database`
        );
            mainMenu();
        }
    );
    });
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role title:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the role salary:",
        },
        {
            type: "input",
            name: "departmentId",
            message: "Enter the department ID:",
        },
    ])
    .then((answers) => {
        db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.departmentId],
            (err, res) => {
            if (err) throw err;
                console.log(`${answers.title} added to the database`);
            mainMenu();
        }
        );
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department name:",
        },
    ])
    .then((answers) => {
        db.query(
            "INSERT INTO departments (name) VALUES (?)",
            [answers.name],
            (err, res) => {
                if (err) throw err;
                console.log(`${answers.name} added to the database`);
                mainMenu();
            }
        );
    });
}

function updateEmployeeRole() {
    db.query("SELECT * FROM employees", (err, employees) => {
        if (err) throw err;
    
        const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
    }));

    inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices,
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter the new role ID:",
        },
        ])
        .then((answers) => {
            db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [answers.roleId, answers.employeeId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Employee role updated");
                    mainMenu();
            }
        );
        });
    });
}

