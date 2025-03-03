const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(name, email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: ' User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: ' User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: ' Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    });
};
