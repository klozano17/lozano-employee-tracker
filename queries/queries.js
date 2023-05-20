const mysql = require('mysql2/promise');

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
  const [rows] = await pool.query('SELECT * FROM departments');
    return rows;
}

async function getAllRoles() {
    const [rows] = await pool.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        LEFT JOIN departments ON roles.departments_id = departments.id`);
    return rows;
}

async function getAllEmployees() {
    const [rows] = await pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS managers
        FROM employees
        LEFT JOIN roles ON employees.roles_id = roles.id
        LEFT JOIN departments ON roles.departments_id = departments.id
        LEFT JOIN employees AS managers ON employees.managers_id = managers.id`);
    return rows;
}

async function addDepartments(name) {
    const [result] = await pool.query('INSERT INTO departments SET ?', { name });
        return result.insertId;
}

async function addRoles(title, salary, departmentsId) {
    const [result] = await pool.query('INSERT INTO roles SET ?', { title, salary, departments_id: departmentsId });
        return result.insertId;
}

async function addEmployees(firstName, lastName, rolesId, managersId) {
    const [result] = await pool.query('INSERT INTO employees SET ?', { first_name: firstName, last_name: lastName, roles_id: rolesId, managers_id: managersId });
        return result.insertId;
}

async function updateEmployeeRole(employeesId, rolesId) {
    const [result] = await pool.query('UPDATE employees SET role_id = ? WHERE id = ?', [rolesId, employeesId]);
        return result.affectedRows > 0;
}   

async function deleteDepartments(departmentsId) {
    const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [departmentsId]);
    return result.affectedRows > 0;
}

async function deleteRoles(rolesId) {
    const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [rolesId]);
    return result.affectedRows > 0;
}

async function deleteEmployees(employeesId) {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [employeesId]);
    return result.affectedRows > 0;
}


module.exports = { getAllDepartments, getAllRoles, getAllEmployees, addDepartments, addRoles, addEmployees, updateEmployeeRole, deleteDepartments, deleteRoles, deleteEmployees };