const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

//  REGISTER USER
router.post("/register", async (req, res) => {
    console.log(" Register route hit");
    console.log(" Received data:", req.body); 

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.error(" Missing fields:", { username, email, password });
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], 
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: " User registered successfully" });
            });
    } catch (error) {
        console.error(" Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// 🔑 LOGIN USER
router.post("/login", (req, res) => {
    console.log(" Login route hit");
    console.log(" Received data:", req.body);

    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: " User not found" });

        const user = results[0];
        console.log(" Stored hashed password:", user.password); 

        //  Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(" Password does not match");
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" }); //  Use secret key
        res.json({ message: "✅ Login successful", token });
    });
});


module.exports = router;
