import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Transaction from './pages/Transaction';
import Laporan from './pages/Laporan';

// 🛡️ MEMBUAT "SATPAM" PENJAGA RUTE
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // 1. Kalau belum login, lempar ke halaman depan
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2. Kalau role-nya nggak diizinkan masuk ke rute ini
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'kasir') return <Navigate to="/transaction" replace />; // Kasir ditendang ke meja kasir
    if (role === 'admin') return <Navigate to="/dashboard" replace />;   // Admin ditendang ke gudang
  }

  // 3. Kalau aman, silakan masuk
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👑 RUTE KHUSUS ADMIN (Kasir gak bisa masuk sini!) */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute allowedRoles={['admin']}><Inventory /></ProtectedRoute>
        } />
        <Route path="/laporan" element={
          <ProtectedRoute allowedRoles={['admin']}><Laporan /></ProtectedRoute>
        } />

        {/* 🤝 RUTE BERSAMA: Tapi isinya dibedakan di dalam file Transaction.jsx */}
        <Route path="/transaction" element={
          <ProtectedRoute allowedRoles={['admin', 'kasir']}><Transaction /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;