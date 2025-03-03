const Product = require('../models/productModel');

exports.createProduct = (req, res) => {
    const { name, price, description, category } = req.body; 
    const user_id = req.user.id; // Authenticated user ID

    // Validate required fields
    if (!name || !price || !category) {
        return res.status(400).json({ message: " Name, price, and category are required." });
    }

    Product.createProduct(name, price, description, category, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: ' Product added successfully!' });
    });
};

exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;

    Product.getProductById(productId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: ' Product not found' });
        res.json(results[0]);
    });
};
