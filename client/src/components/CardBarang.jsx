import React from 'react';

const CardBarang = ({ item, onEdit, onDelete }) => {
  const API_URL = "http://localhost:5000";

  // 🎨 Design Tokens (Disesuaikan persis dengan Dashboard)
  const aestheticGreen    = '#86efac';
  const aestheticGreenRGB = '134, 239, 172';

  const isOutOfStock = item.stok <= 0;
  const isLowStock   = item.stok > 0 && item.stok <= 5;

  return (
    <div
      className="relative flex flex-col p-5 rounded-[24px] transition-all duration-300 group overflow-hidden"
      style={{
        // ✅ Efek Kaca Gelap (Dark Glassmorphism) menyatu dengan Dashboard
        background: 'rgba(12, 36, 24, 0.65)',
        border: `1px solid rgba(${aestheticGreenRGB}, 0.12)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background  = 'rgba(16, 48, 32, 0.85)';
        e.currentTarget.style.borderColor = `rgba(${aestheticGreenRGB}, 0.35)`;
        e.currentTarget.style.transform   = 'translateY(-6px)';
        e.currentTarget.style.boxShadow   = `0 16px 40px rgba(${aestheticGreenRGB}, 0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background  = 'rgba(12, 36, 24, 0.65)';
        e.currentTarget.style.borderColor = `rgba(${aestheticGreenRGB}, 0.12)`;
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.2)';
      }}
    >

      {/* ── 1. BADGES (Kategori & Stok) ── */}
      <div className="flex justify-between items-center mb-4 z-10 relative">
        <div
          className="px-3 py-1.5 rounded-[10px] text-[10px] font-bold uppercase tracking-widest"
          style={{ background: `rgba(${aestheticGreenRGB}, 0.12)`, color: aestheticGreen }}
        >
          {item.kategori || 'UMUM'}
        </div>

        {isOutOfStock ? (
          <div className="px-3 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
            HABIS
          </div>
        ) : isLowStock ? (
          <div className="px-3 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest"
            style={{ background: 'rgba(249,115,22,0.15)', color: '#fdba74', border: '1px solid rgba(249,115,22,0.25)' }}>
            SISA {item.stok}
          </div>
        ) : null}
      </div>

      {/* ── 2. GAMBAR BARANG ── */}
      <div
        className={`w-full h-44 rounded-[18px] flex items-center justify-center mb-5 overflow-hidden transition-all duration-500 relative z-10 ${isOutOfStock ? 'opacity-40 grayscale' : ''}`}
        style={{
          // Background semi-transparan untuk gambar agar tetap stand out
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {item.gambar ? (
          <img
            src={`${API_URL}${item.gambar}`}
            alt={item.nama_barang}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg>
          </div>
        )}
      </div>

      {/* ── 3. INFORMASI BARANG (Teks Terang) ── */}
      <div className="flex-1 flex flex-col z-10 relative px-1">
        <h3
          className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 min-h-[44px] transition-colors duration-300"
          style={{ color: isOutOfStock ? 'rgba(255,255,255,0.4)' : '#ffffff' }}
        >
          {/* Teks berubah jadi hijau terang saat card di-hover */}
          <span style={{ transition: 'color 0.3s' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = aestheticGreen}
                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
            {item.nama_barang}
          </span>
        </h3>

        <div className="flex items-baseline gap-1">
          <p
            className="font-extrabold text-[22px] tracking-tight transition-colors"
            style={{ color: isOutOfStock ? 'rgba(255,255,255,0.4)' : aestheticGreen }}
          >
            Rp {Number(item.harga).toLocaleString('id-ID')}
          </p>
        </div>

        <p className="text-[12px] font-medium mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Stok: <span className="font-bold text-white">{item.stok} pcs</span>
        </p>
      </div>

      {/* ── 4. GARIS PEMISAH HALUS ── */}
      <div
        className="w-full h-[1px] my-5 z-10 relative"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.15), transparent)` }}
      />

      {/* ── 5. TOMBOL AKSI (Dark Theme Buttons) ── */}
      <div className="flex gap-3 z-10 relative">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[14px] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            color: '#93c5fd', // Lighter blue
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background  = 'rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = 'rgba(59, 130, 246, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5z"/>
          </svg>
          Edit
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[14px] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#fca5a5', // Lighter red
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background  = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CardBarang;