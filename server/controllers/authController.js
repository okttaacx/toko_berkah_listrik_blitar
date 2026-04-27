const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Tambahkan ini

// Fungsi Register (Sudah ada sebelumnya)
exports.register = async (req, res) => {
  try {
    const { nama, username, password, role } = req.body;

    const userExist = await User.findOne({ username });
    if (userExist) return res.status(400).json({ message: 'Username sudah digunakan' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nama,
      username,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'User berhasil didaftarkan!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi Login (Tambahkan ini)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Cek apakah user ada di database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Username tidak ditemukan' });

    // 2. Cek apakah password cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah' });

    // 3. Buat Token JWT (Tiket Masuk)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token berlaku 1 hari
    );

    res.json({
      message: 'Login berhasil!',
      token: token,
      user: {
        id: user._id,
        nama: user.nama,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};