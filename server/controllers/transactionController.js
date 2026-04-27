const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// Fitur Kasir: Membuat Transaksi Baru
exports.createTransaction = async (req, res) => {
  try {
    const { barang_dibeli } = req.body;
    // Format yang diharapkan dari Postman/React:
    // [{ "produk": "id_barang_A", "jumlah": 2 }, { "produk": "id_barang_B", "jumlah": 1 }]

    let total_harga = 0;
    const processedItems = [];

    // 1. Looping untuk cek stok dan hitung total harga
    for (let item of barang_dibeli) {
      const product = await Product.findById(item.produk);

      if (!product) {
        return res.status(404).json({ message: `Produk tidak ditemukan` });
      }

      if (product.stok < item.jumlah) {
        return res.status(400).json({ 
          message: `Stok ${product.nama_barang} tidak cukup! Sisa stok: ${product.stok}` 
        });
      }

      // Hitung subtotal (Harga diambil dari database, BUKAN dari input user, ini standar keamanan)
      const subtotal = product.harga * item.jumlah;
      total_harga += subtotal;

      processedItems.push({
        produk: product._id,
        jumlah: item.jumlah,
        harga_satuan: product.harga
      });
    }

    // 2. Jika semua stok aman, baru kita potong stok produknya
    for (let item of processedItems) {
      await Product.findByIdAndUpdate(item.produk, {
        $inc: { stok: -item.jumlah } // $inc dengan minus artinya mengurangi angka
      });
    }

    // 3. Simpan struk transaksi ke database
    const newTransaction = new Transaction({
      kasir: req.user.id, // ID Kasir didapat otomatis dari Middleware (Token JWT)
      barang_dibeli: processedItems,
      total_harga: total_harga
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaksi berhasil! Stok terpotong.', data: newTransaction });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fitur Laporan: Melihat Riwayat Transaksi
exports.getTransactions = async (req, res) => {
  try {
    // Populate digunakan agar ID kasir dan produk diubah menjadi data aslinya (nama dll)
    const transactions = await Transaction.find()
      .populate('kasir', 'nama username')
      .populate('barang_dibeli.produk', 'nama_barang kategori harga');
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};