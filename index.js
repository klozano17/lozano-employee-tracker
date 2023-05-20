const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");
const queries = require('./queries/queries.js');

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
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
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "Exit",
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
                addEmployees();
                break;
            case "Add a role":
                addRoles();
                break;
            case "Add a department":
                addDepartments();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "Delete a Department":
                deleteDepartments();
                break;
            case "Delete a Role":
                deleteRoles();
                break;
            case "Delete an Employee":
                deleteEmployees();
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


function addEmployees() {
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
        "INSERT INTO employees (first_name, last_name, roles_id, managers_id) VALUES (?, ?, ?, ?)",
        [
        answers.firstName,
        answers.lastName,
        answers.rolesId,
        answers.managersId || null,
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


function addRoles() {
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
            "INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.departmentsId],
            (err, res) => {
            if (err) throw err;
                console.log(`${answers.title} added to the database`);
            mainMenu();
        }
        );
    });
}

function addDepartments() {
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
    
        const employeeChoices = employees.map((employees) => ({
            name: `${employees.first_name} ${employees.last_name}`,
            value: employees.id,
    }));

    inquirer.prompt([
        {
            type: "list",
            name: "employeesId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices,
        },
        {
            type: "input",
            name: "rolesId",
            message: "Enter the new role ID:",
        },
        ])
        .then((answers) => {
            db.query(
                "UPDATE employees SET roles_id = ? WHERE id = ?",
                [answers.rolesId, answers.employeesId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Employee role updated");
                    mainMenu();
            }
        );
        });
    });
}


async function deleteDepartments() {
    try {
        const departments = await queries.getAllDepartments();
        const departmentChoices = departments.map((departments) => ({
            name: departments.name,
            value: departments.id,
        }));

        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "departmentsId",
                message: "Select the departments to delete:",
                choices: departmentChoices,
            },
        ]);

        const deleted = await queries.deleteDepartments(answers.departmentsId);
        if (deleted) {
            console.log("Department deleted");
        } else {
            console.log("Failed to delete department");
        }
    } catch (err) {
        console.error(err);
    }

    mainMenu();
}

async function deleteRoles() {
    try {
        const roles = await queries.getAllRoles();
        const roleChoices = roles.map((roles) => ({
            name: roles.title,
            value: roles.id,
        }));

        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "rolesId",
                message: "Select the role to delete:",
                choices: roleChoices,
            },
        ]);

        const deleted = await queries.deleteRoles(answers.rolesId);
        if (deleted) {
            console.log("Role deleted");
        } else {
            console.log("Failed to delete role");
        }
    } catch (err) {
        console.error(err);
    }

    mainMenu();
}

async function deleteEmployees() {
    try {
        const employees = await queries.getAllEmployees();
        const employeeChoices = employees.map((employees) => ({
            name: `${employees.first_name} ${employees.last_name}`,
            value: employees.id,
        }));

        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "employeesId",
                message: "Select the employee to delete:",
                choices: employeeChoices,
            },
        ]);

        const deleted = await queries.deleteEmployees(answers.employeesId);
        if (deleted) {
            console.log("Employee deleted");
        } else {
            console.log("Failed to delete employee");
        }
    } catch (err) {
        console.error(err);
    }

    mainMenu();
}
