// this handles MySQL database connection
const mysql = require('mysql2');
require('dotenv').config();

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // Hostname from .env
    user: process.env.DB_USER,  // MySQL username
    password: process.env.DB_PASS, // MySQL password
    database: process.env.DB_NAME // MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database.');
    }
});

module.exports = db; // Export database connection
