import React, { useState, useEffect } from 'react';

const ModalBarang = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditMode }) => {
  const [mounted, setMounted] = useState(false);

  // Animasi masuk (Fade & Slide in)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setMounted(true), 10);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 🎨 Design Tokens (Tema Dark Aesthetic Green)
  const aestheticGreen     = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB  = '134, 239, 172';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] p-4"
      style={{
        // ✅ Overlay super gelap dengan efek blur
        background: 'rgba(2, 10, 6, 0.75)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={onClose} 
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-[28px] overflow-hidden"
        style={{
          // ✅ Background Modal Kaca Gelap
          background: 'rgba(12, 36, 24, 0.85)',
          border: `1px solid rgba(${aestheticGreenRGB}, 0.15)`,
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          boxShadow: `0 32px 64px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* === EFEK AWAN GLOW di dalam Modal === */}
        <div 
          className="pointer-events-none absolute top-[-60px] left-[-60px] w-48 h-48 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.15) 0%, transparent 70%)` }}
        />
        <div 
          className="pointer-events-none absolute bottom-[-40px] right-[-40px] w-40 h-40 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.1) 0%, transparent 70%)` }}
        />

        {/* Konten Modal */}
        <div className="relative z-10 p-7">
          
          {/* HEADER MODAL */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ 
                  background: `rgba(${aestheticGreenRGB},0.1)`, 
                  border: `1px solid rgba(${aestheticGreenRGB},0.25)`, 
                  color: aestheticGreen 
                }}
              >
                {isEditMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#ffffff] tracking-wide leading-none">
                  {isEditMode ? 'Update Barang' : 'Barang Baru'}
                </h3>
                <p className="text-[10px] tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {isEditMode ? 'Ubah rincian data produk' : 'Tambahkan produk ke inventaris'}
                </p>
              </div>
            </div>
            
            {/* Tombol Close */}
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all group"
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                e.currentTarget.style.color = '#fca5a5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
          </div>
          
          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            
            {/* Nama Barang */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: aestheticGreen }}>Nama Barang</label>
              <input 
                type="text" 
                required 
                placeholder="Misal: Kabel Eterna 2x1.5"
                className="w-full px-4 py-3 rounded-[12px] text-[13px] outline-none transition-all placeholder-gray-500 font-medium"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.4)';
                  e.target.style.borderColor = aestheticGreen;
                  e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.2)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
                value={formData.nama_barang} 
                onChange={(e) => setFormData({...formData, nama_barang: e.target.value})} 
              />
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: aestheticGreen }}>Pilih Foto Produk</label>
              <div 
                className="relative flex items-center justify-between w-full px-4 py-2.5 rounded-[12px] transition-all overflow-hidden"
                style={{
                  background: 'rgba(0,0,0,0.1)',
                  border: `1px dashed rgba(${aestheticGreenRGB},0.25)`,
                }}
              >
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => setFormData({...formData, gambar: e.target.files[0]})} 
                />
                <span className="text-[12px] truncate" style={{ color: formData.gambar ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                  {formData.gambar && formData.gambar.name ? formData.gambar.name : 'Pilih file gambar...'}
                </span>
                <div 
                  className="px-3 py-1.5 rounded-[8px] text-[10px] font-bold flex items-center gap-1.5"
                  style={{ background: `rgba(${aestheticGreenRGB},0.15)`, color: aestheticGreen }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                  Browse
                </div>
              </div>
              <p className="text-[9px] mt-1.5 italic flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <span className="text-[8px] opacity-70">💡</span> Format yang didukung: .jpg, .png, .webp
              </p>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: aestheticGreen }}>Kategori</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 rounded-[12px] text-[13px] outline-none transition-all appearance-none cursor-pointer font-medium"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.4)';
                    e.target.style.borderColor = aestheticGreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.2)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.kategori} 
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                >
                  <option value="Lampu" className="bg-[#0a2218] text-[#ffffff]">Lampu</option>
                  <option value="Kabel" className="bg-[#0a2218] text-[#ffffff]">Kabel</option>
                  <option value="Stop Kontak" className="bg-[#0a2218] text-[#ffffff]">Stop Kontak</option>
                  <option value="Saklar" className="bg-[#0a2218] text-[#ffffff]">Saklar</option>
                  <option value="Lainnya" className="bg-[#0a2218] text-[#ffffff]">Lainnya</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Harga & Stok (Grid 2 Kolom) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: aestheticGreen }}>Harga (Rp)</label>
                <input 
                  type="number" 
                  required 
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-[12px] text-[13px] outline-none transition-all placeholder-gray-500 font-medium"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.4)';
                    e.target.style.borderColor = aestheticGreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.2)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.harga} 
                  onChange={(e) => setFormData({...formData, harga: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: aestheticGreen }}>Stok Fisik</label>
                <input 
                  type="number" 
                  required 
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-[12px] text-[13px] outline-none transition-all placeholder-gray-500 font-medium"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.4)';
                    e.target.style.borderColor = aestheticGreen;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(0,0,0,0.2)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.stok} 
                  onChange={(e) => setFormData({...formData, stok: e.target.value})} 
                />
              </div>
            </div>

            {/* Garis Pemisah */}
            <div className="w-full h-[1px] my-4" style={{ background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.15), transparent)` }} />

            {/* Tombol Simpan */}
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[12px] text-[13px] font-bold tracking-widest uppercase transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${aestheticGreen} 0%, ${aestheticGreenDark} 100%)`,
                color: '#022c16', // Teks sangat gelap agar kontras dengan hijau terang
                boxShadow: `0 6px 20px rgba(${aestheticGreenRGB},0.25)`,
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(${aestheticGreenRGB},0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 6px 20px rgba(${aestheticGreenRGB},0.25)`;
              }}
            >
              {isEditMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5z"/>
                  </svg>
                  <span>Simpan Perubahan</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  <span>Simpan Barang</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        /* Style scrollbar dropdown (untuk beberapa browser) */
        select option {
          background-color: #0a2218;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ModalBarang;