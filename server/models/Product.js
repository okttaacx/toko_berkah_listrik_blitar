const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nama_barang: { type: String, required: true },
  kategori: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true, default: 0 },
  gambar: { type: String, default: '' }, // Simpan URL foto di sini
}, { timestamps: true });

module.exports = mongoose.json || mongoose.model('Product', productSchema);