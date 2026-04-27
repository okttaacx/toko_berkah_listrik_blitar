const Product = require('../models/Product');
const fs = require('fs'); // Untuk menghapus file lama jika barang dihapus/diedit

// 1. LIHAT SEMUA BARANG
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. TAMBAH BARANG BARU (Dukungan Upload File)
exports.createProduct = async (req, res) => {
  try {
    const { nama_barang, kategori, harga, stok } = req.body;
    
    // Ambil path file dari multer (req.file)
    // Kita simpan path-nya saja, misal: /uploads/17123456.jpg
    const gambar = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      nama_barang,
      kategori,
      harga,
      stok,
      gambar 
    });

    await newProduct.save();
    res.status(201).json({ message: 'Barang berhasil ditambahkan!', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. EDIT BARANG (Dukungan Update File)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, kategori, harga, stok } = req.body;
    
    // Cari barang lama dulu
    const productOld = await Product.findById(id);
    if (!productOld) return res.status(404).json({ message: 'Barang tidak ditemukan' });

    // Cek apakah ada file baru yang diupload
    let gambar = productOld.gambar; // Default pakai gambar lama
    if (req.file) {
      // Hapus foto lama dari folder uploads jika ada foto baru (biar gak menuhin storage)
      if (productOld.gambar) {
        const oldPath = `./${productOld.gambar}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      gambar = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      { nama_barang, kategori, harga, stok, gambar },
      { returnDocument: 'after' } // <--- BAGIAN INI YANG SUDAH DIPERBAIKI
    );
    
    res.json({ message: 'Barang berhasil diupdate!', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. HAPUS BARANG (Sekalian Hapus File di Folder)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (product && product.gambar) {
      const pathGambar = `./${product.gambar}`;
      if (fs.existsSync(pathGambar)) fs.unlinkSync(pathGambar); // Hapus file asli di folder
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: 'Barang berhasil dihapus!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};