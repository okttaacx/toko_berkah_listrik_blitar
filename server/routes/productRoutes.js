const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // File akan masuk ke folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file jadi unik (angka+ekstensi)
  }
});

const upload = multer({ storage: storage });

// Rute dengan upload.single('gambar')
router.get('/', getProducts);
router.post('/', upload.single('gambar'), createProduct); // Tambahkan middleware upload
router.put('/:id', upload.single('gambar'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;