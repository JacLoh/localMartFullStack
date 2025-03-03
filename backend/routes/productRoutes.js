const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// ADD PRODUCT (Protected Route)
router.post("/", authMiddleware, (req, res) => {
    console.log(" Add Product route hit");
    
    const { name, price, description, category } = req.body;
    const userId = req.user.userId; // Extract user from token

    if (!name || !price || !category) {
        return res.status(400).json({ message: " All required fields must be filled!" });
    }

    db.query('INSERT INTO products (name, price, description, category, user_id) VALUES (?, ?, ?, ?, ?)', 
    [name, price, description, category, userId], 
    (err, result) => {
        if (err) {
            console.error(" SQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product added successfully" });
    }
);

});


router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
router.delete("/:id", authMiddleware, (req, res) => {
    console.log(" Delete Product route hit");

    const productId = req.params.id;
    const userId = req.user.userId; // Ensure the user is authenticated

    db.query(
        "DELETE FROM products WHERE id = ? AND user_id = ?",
        [productId, userId],
        (err, result) => {
            if (err) {
                console.error(" SQL Error:", err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: " Product not found or not authorized to delete" });
            }
            res.status(200).json({ message: " Product deleted successfully" });
        }
    );
});
module.exports = router;
