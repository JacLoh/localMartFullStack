require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors()); // Enable frontend communication
app.use(bodyParser.json()); // Parse JSON requests


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


app.use('/auth', authRoutes);
app.use('/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
