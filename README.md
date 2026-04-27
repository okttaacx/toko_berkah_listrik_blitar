# ⚡ Toko Listrik Berkah
### Fullstack Cashier & Inventory Management System

> Aplikasi manajemen penjualan dan inventaris berbasis web yang dikembangkan khusus untuk **Toko Listrik Berkah** — fokus pada kemudahan transaksi kasir dan pelaporan analitik bagi admin.

<br>

## ✨ Fitur Utama

### 👤 Multi-Role Access Control
- **Admin** — Akses penuh ke dashboard analitik, riwayat seluruh transaksi, manajemen produk, dan laporan pendapatan.
- **Kasir** — Antarmuka transaksi (POS) yang cepat, bersih, dan efisien.

### 📊 Laporan Analitik & Riwayat
- Dashboard dengan visualisasi data performa toko secara real-time.
- Riwayat transaksi yang dapat difilter berdasarkan **Tanggal**, **Bulan**, dan **Tahun**.
- Fitur **Cetak Ulang Struk** ke format fisik atau PDF.

### 🎨 Desain Modern (UI/UX)
- Tema **Dark Aesthetic Green** yang elegan.
- **Glassmorphism design** dengan efek blur dan transparansi halus.
- Responsif untuk **Desktop** dan **Tablet**.

<br>

## 🛠️ Teknologi yang Digunakan

| Layer | Teknologi |
|---|---|
| **Frontend** | React.js + Vite |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (NoSQL) |
| **State & API** | React Hooks + Axios |
| **Font** | Poppins & Courier New |

<br>

## 🚀 Cara Menjalankan Proyek

### 1. 🗄️ Persiapan Database

Pastikan Anda sudah memiliki akun **MongoDB Atlas** atau menjalankan **MongoDB** secara lokal.

---

### 2. ⚙️ Konfigurasi Backend

````bash
# Masuk ke folder server
cd server

# Install dependensi
npm install

# Buat file .env lalu isi konfigurasi berikut:
# -----------------------------------------------
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
# -----------------------------------------------

# Jalankan server (development mode)
npm run dev
````

---

### 3. 🎨 Konfigurasi Frontend

````bash
# Masuk ke folder client
cd client

# Install dependensi
npm install

# Jalankan aplikasi (development mode)
npm run dev
````

> Aplikasi akan berjalan di `http://localhost:5173` secara default.

<br>

## 🔑 Akun Demo

Gunakan kredensial berikut untuk mencoba fitur berdasarkan hak akses (Role):

| Role | Username | Password |
|---|---|---|
| 👑 Admin | `oktaramji` | `password123` |
| 🧾 Kasir | `okta` | `Semarang123` |

<br>

---

<div align="center">
  <p>Dikembangkan oleh</p>
  <b>Okta Ramji Saputra</b><br>
</div>

````
