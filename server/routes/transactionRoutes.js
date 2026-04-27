const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware'); // Import satpam token

// Rute ini dilindungi oleh "protect", jadi wajib kirim token JWT
router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);

module.exports = router;