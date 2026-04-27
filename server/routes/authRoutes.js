const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Import login juga

router.post('/register', register);
router.post('/login', login); // Tambahkan route login

module.exports = router;