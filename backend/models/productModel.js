const db = require('../config/db');

const Product = {
    createProduct: (name, price, description, category, image_url, user_id, callback) => {
        const sql = `INSERT INTO products (name, price, description, category, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name, price, description, category, image_url, user_id], callback);
    },

    getAllProducts: (callback) => {
        const sql = `SELECT * FROM products`;
        db.query(sql, callback);
    },

    getProductById: (id, callback) => {
        const sql = `SELECT * FROM products WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};

module.exports = Product;
