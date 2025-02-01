const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
// const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); // Keep this for JSON-based requests
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection

mongoose.connect('mongodb://localhost:27017/utgconnect')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');


app.use('/api/cart', cartRoutes);



// Static folder for images
app.use('/uploads', express.static('backend'))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// added

// const orderRoutes = require('./routes/orderRoutes');
// app.use('/api/orders', orderRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
