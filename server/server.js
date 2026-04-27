const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); // Tambahkan ini

// Gunakan Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes); // Tambahkan ini

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB terhubung!'))
  .catch((err) => console.log('Error koneksi:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});