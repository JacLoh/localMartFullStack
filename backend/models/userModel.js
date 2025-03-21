const db = require('../config/db');

const User = {
    createUser: (name, email, password, callback) => {
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [name, email, password], callback);
    },

    findUserByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], callback);
    },

    findUserById: (id, callback) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};

module.exports = User;
