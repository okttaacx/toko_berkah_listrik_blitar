const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Menyimpan ID Kasir yang melayani
  kasir: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Menyimpan array/daftar barang yang dibeli
  barang_dibeli: [{
    produk: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    jumlah: { type: Number, required: true },
    harga_satuan: { type: Number, required: true }
  }],
  total_harga: { type: Number, required: true },
}, { timestamps: true }); // otomatis mencatat tanggal & jam transaksi

module.exports = mongoose.model('Transaction', transactionSchema);