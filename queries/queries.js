/*  const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Eliasramon2020!',
    database: 'employee_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Define query functions

async function getAllDepartments() {
  const [rows] = await pool.query('SELECT * FROM department');
    return rows;
}

async function getAllRoles() {
    const [rows] = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department ON role.department_id = department.id`);
    return rows;
}

async function getAllEmployees() {
    const [rows] = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
    return rows;
}

async function addDepartment(name) {
    const [result] = await pool.query('INSERT INTO department SET ?', { name });
        return result.insertId;
}

async function addRole(title, salary, departmentId) {
    const [result] = await pool.query('INSERT INTO role SET ?', { title, salary, department_id: departmentId });
        return result.insertId;
}

async function addEmployee(firstName, lastName, roleId, managerId) {
    const [result] = await pool.query('INSERT INTO employee SET ?', { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId });
        return result.insertId;
}

async function updateEmployeeRole(employeeId, roleId) {
    const [result] = await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
        return result.affectedRows > 0;
}   

module.exports = { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };*/
