const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: '',      // Replace with your MySQL password
    database: 'task_manager', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;
