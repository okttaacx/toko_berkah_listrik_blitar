const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Ambil token dari header request
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ada!' });
  }

  try {
    // Postman biasanya mengirim token dengan format "Bearer eyJhbG..."
    // Jadi kita pisahkan kata "Bearer" dan ambil tokennya saja
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    // Verifikasi token pakai kunci rahasia dari .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan data user (id & role) ke dalam request agar bisa dibaca oleh Controller
    req.user = decoded; 
    
    next(); // Silakan lewat! Lanjut ke Controller
  } catch (error) {
    res.status(400).json({ message: 'Token tidak valid atau sudah kadaluarsa!' });
  }
};

module.exports = protect;