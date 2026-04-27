import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const API_URL = "http://localhost:5000";

  // 🎨 Design Tokens (Sama Persis dengan Dashboard)
  const aestheticGreen     = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB  = '134, 239, 172';

  // 1. Ambil Data Produk dari Database
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal ambil data barang", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Fungsi Hapus Barang
  const handleDelete = async (id, nama) => {
    if (window.confirm(`Yakin mau menghapus ${nama} dari gudang?`)) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Barang berhasil dihapus!');
        fetchProducts(); // Refresh tabel
      } catch (error) {
        alert('Gagal menghapus barang.');
      }
    }
  };

  // Logika Pencarian
  const filteredProducts = products.filter(product => 
    product.nama_barang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      // ✅ Background global Dashboard
      background: 'linear-gradient(135deg, #061810 0%, #0a2218 60%, #07150f 100%)',
    }}>
      <style>{`
        /* Scrollbar persis seperti Dashboard */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(134,239,172,0.3); border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(134,239,172,0.5); }
      `}</style>
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* ── Area Konten Utama ── */}
      <div style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 24px 24px 20px',
        position: 'relative',
        boxSizing: 'border-box',
      }}>
        
        {/* === EFEK AWAN GLOW (Diubah jadi hijau gelap) === */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.09) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: '240px', height: '240px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.06) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

        {/* ── HEADER INVENTORY ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10 flex-shrink-0">
          <div>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '22px', fontWeight: 800,
              color: '#ffffff', letterSpacing: '1px',
              display: 'flex', alignItems: 'center', gap: '10px', margin: 0,
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: `rgba(${aestheticGreenRGB},0.15)`,
                border: `1px solid rgba(${aestheticGreenRGB},0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: aestheticGreen,
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6z"/>
                </svg>
              </div>
              Manajemen Gudang
            </h1>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '12px',
              color: 'rgba(255,255,255,0.35)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.5px',
            }}>
              Pantau dan atur seluruh stok barang di tokomu.
            </p>
          </div>

          {/* Kotak Pencarian (Dark Glassy Modern) */}
          <div className="relative w-full md:w-80">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Cari nama barang..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-[14px] text-[12px] outline-none font-medium transition-all placeholder:text-gray-500"
              style={{
                background: 'rgba(12,36,24,0.6)',
                border: `1px solid rgba(${aestheticGreenRGB},0.15)`,
                color: '#ffffff',
                backdropFilter: 'blur(12px)'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(12,36,24,0.9)';
                e.target.style.borderColor = aestheticGreen;
                e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB}, 0.15)`;
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(12,36,24,0.6)';
                e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.15)`;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* ── KONTAINER UTAMA DARK GLASSMORPHISM ── */}
        <div 
          className="flex-1 flex flex-col rounded-[24px] p-5 md:p-6 relative z-10"
          style={{
            background: 'rgba(12,36,24,0.72)', 
            border: `1px solid rgba(${aestheticGreenRGB},0.12)`, 
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}
        >
          {/* Header Tabel */}
          <div className="flex justify-between items-center mb-5">
            <h3 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 700,
              color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', margin: 0,
            }}>
              Daftar Stok
            </h3>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '10px', fontWeight: 700,
              color: aestheticGreen, background: `rgba(${aestheticGreenRGB},0.1)`,
              border: `1px solid rgba(${aestheticGreenRGB},0.22)`,
              padding: '4px 12px', borderRadius: '8px',
            }}>
              {filteredProducts.length} Item
            </span>
          </div>
          
          {/* ── AREA TABEL ── */}
          <div className="overflow-x-auto overflow-y-auto flex-1 rounded-[16px]"
               style={{ border: `1px solid rgba(${aestheticGreenRGB}, 0.08)`, background: 'rgba(0,0,0,0.1)' }}>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="sticky top-0 z-10" style={{ background: 'rgba(10, 34, 24, 0.95)', backdropFilter: 'blur(10px)', borderBottom: `1px solid rgba(${aestheticGreenRGB}, 0.15)` }}>
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>Foto</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>Nama Barang</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>Harga Jual</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>Stok</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>Aksi</th>
                </tr>
              </thead>
              
              <tbody style={{ divideY: '1px', borderColor: `rgba(${aestheticGreenRGB}, 0.05)` }}>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin mx-auto" style={{ borderColor: `rgba(${aestheticGreenRGB}, 0.15)`, borderTopColor: aestheticGreen }} />
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Memuat data...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 flex flex-col items-center justify-center">
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: `rgba(${aestheticGreenRGB},0.1)`, border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: aestheticGreen, marginBottom: '16px'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6z"/>
                        </svg>
                      </div>
                      <p className="font-bold text-[14px] text-white">Barang Tidak Ditemukan</p>
                      <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Coba gunakan kata kunci pencarian yang lain.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => (
                    <tr key={item._id} className="transition-colors group" 
                        style={{ borderBottom: `1px solid rgba(${aestheticGreenRGB}, 0.05)` }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      
                      {/* Sel Gambar */}
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-[12px] overflow-hidden flex items-center justify-center"
                             style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {item.gambar ? (
                            <img src={`${API_URL}${item.gambar}`} alt={item.nama_barang} className="w-full h-full object-contain p-1" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ color: 'rgba(255,255,255,0.2)' }} viewBox="0 0 16 16">
                              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6z"/>
                            </svg>
                          )}
                        </div>
                      </td>

                      {/* Sel Nama Barang */}
                      <td className="px-6 py-4 font-bold text-[13px] max-w-[250px] truncate" style={{ color: '#ffffff' }}>
                        {item.nama_barang}
                      </td>

                      {/* Sel Harga */}
                      <td className="px-6 py-4 font-extrabold text-[13px]" style={{ color: aestheticGreen }}>
                        Rp {item.harga.toLocaleString('id-ID')}
                      </td>

                      {/* Sel Stok (Badges) */}
                      <td className="px-6 py-4 text-center">
                        <span 
                          className="px-3 py-1.5 rounded-[8px] font-bold text-[10px] tracking-wider uppercase inline-block min-w-[60px]"
                          style={
                            item.stok <= 0 
                              ? { background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.25)' } 
                              : item.stok <= 5
                              ? { background: 'rgba(249, 115, 22, 0.15)', color: '#fdba74', border: '1px solid rgba(249, 115, 22, 0.25)' }
                              : { background: `rgba(${aestheticGreenRGB}, 0.15)`, color: aestheticGreen, border: `1px solid rgba(${aestheticGreenRGB}, 0.25)` }
                          }
                        >
                          {item.stok} Pcs
                        </span>
                      </td>

                      {/* Sel Aksi (Hapus) */}
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDelete(item._id, item.nama_barang)}
                          className="w-8 h-8 rounded-[10px] flex items-center justify-center mx-auto transition-all active:scale-95"
                          title="Hapus Barang"
                          style={{
                            background: 'rgba(239, 68, 68, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.15)',
                            color: '#fca5a5',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.15)';
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Inventory;