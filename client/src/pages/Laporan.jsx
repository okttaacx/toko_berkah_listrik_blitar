import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

const Laporan = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk menyimpan hasil perhitungan analitik
  const [stats, setStats] = useState({
    totalPendapatan: 0,
    totalTransaksi: 0,
    totalBarangTerjual: 0,
    produkTerlaris: []
  });

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = res.data;
        setTransactions(data);

        // LOGIKA SAKTI: MENGHITUNG ANALITIK TOKO
        let pendapatan = 0;
        let barangTerjual = 0;
        let keranjangProduk = {};

        data.forEach(trx => {
          pendapatan += trx.total_harga; // Hitung total uang
          
          trx.barang_dibeli.forEach(item => {
            barangTerjual += item.jumlah; // Hitung total fisik barang keluar
            
            // Mencari Produk Terlaris
            const namaBarang = item.produk?.nama_barang || 'Barang Dihapus';
            if (!keranjangProduk[namaBarang]) {
              keranjangProduk[namaBarang] = { nama: namaBarang, terjual: 0, sumbanganPendapatan: 0 };
            }
            keranjangProduk[namaBarang].terjual += item.jumlah;
            keranjangProduk[namaBarang].sumbanganPendapatan += (item.jumlah * item.harga_satuan);
          });
        });

        // Ubah objek keranjangProduk jadi array, lalu urutkan dari yang paling laku
        const rankingProduk = Object.values(keranjangProduk).sort((a, b) => b.terjual - a.terjual);

        setStats({
          totalPendapatan: pendapatan,
          totalTransaksi: data.length,
          totalBarangTerjual: barangTerjual,
          produkTerlaris: rankingProduk
        });

      } catch (err) {
        console.error("Gagal ambil data laporan", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLaporan();
  }, []);

  // 🎨 Design Tokens (Sama Persis dengan Dashboard & Inventory)
  const aestheticGreen     = '#86efac';
  const aestheticGreenRGB  = '134, 239, 172';

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
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
        <div style={{ position: 'absolute', top: '15%', right: '30%', width: '240px', height: '240px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.06) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

        {/* HEADER LAPORAN */}
        <div className="mb-8 relative z-10 flex-shrink-0">
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
                <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
              </svg>
            </div>
            Laporan Analitik Toko
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: '12px',
            color: 'rgba(255,255,255,0.35)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.5px',
          }}>
            Ringkasan performa penjualan dan statistik Toko Listrik Berkah.
          </p>
        </div>

        {/* KONTAINER UTAMA DARK GLASSMORPHISM */}
        <div 
          className="flex-1 flex flex-col rounded-[24px] p-5 md:p-6 relative z-10"
          style={{
            background: 'rgba(12,36,24,0.72)', 
            border: `1px solid rgba(${aestheticGreenRGB},0.12)`, 
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `rgba(${aestheticGreenRGB}, 0.15)`, borderTopColor: aestheticGreen }} />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }} className="animate-pulse">Memuat Data Laporan...</p>
            </div>
          ) : (
            <>
              {/* KARTU STATISTIK ATAS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                
                {/* 1. Kartu Pendapatan (SUDAH DIBUAT 100% STATIS, TIDAK AKAN BERGESER/BERGERAK) */}
                <div className="p-5 rounded-[20px] flex items-center gap-4"
                     style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid rgba(${aestheticGreenRGB},0.1)` }}>
                  <div 
                    className="w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl"
                    style={{ background: `rgba(${aestheticGreenRGB}, 0.1)`, border: `1px solid rgba(${aestheticGreenRGB}, 0.2)` }}
                  >
                    💰
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Total Pendapatan</p>
                    <h3 className="text-xl font-black" style={{ color: aestheticGreen }}>
                      Rp {stats.totalPendapatan.toLocaleString('id-ID')}
                    </h3>
                  </div>
                </div>

                {/* 2. Kartu Transaksi (Tetap ada hover) */}
                <div className="p-5 rounded-[20px] group flex items-center gap-4"
                     style={{ 
                       background: 'rgba(0,0,0,0.2)', 
                       border: `1px solid rgba(96, 165, 250, 0.15)`,
                       transition: 'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(30, 58, 138, 0.2)';
                       e.currentTarget.style.borderColor = `rgba(96, 165, 250, 0.4)`;
                       e.currentTarget.style.transform = 'translateY(-4px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                       e.currentTarget.style.borderColor = `rgba(96, 165, 250, 0.15)`;
                       e.currentTarget.style.transform = 'translateY(0)';
                     }}>
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300"
                       style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
                    🧾
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Total Transaksi</p>
                    <h3 className="text-xl font-black text-[#93c5fd]">{stats.totalTransaksi} <span className="text-sm" style={{ color: 'rgba(147, 197, 253, 0.6)' }}>Nota</span></h3>
                  </div>
                </div>

                {/* 3. Kartu Barang Keluar (Tetap ada hover) */}
                <div className="p-5 rounded-[20px] group flex items-center gap-4"
                     style={{ 
                       background: 'rgba(0,0,0,0.2)', 
                       border: `1px solid rgba(251, 146, 60, 0.15)`,
                       transition: 'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(154, 52, 18, 0.2)';
                       e.currentTarget.style.borderColor = `rgba(251, 146, 60, 0.4)`;
                       e.currentTarget.style.transform = 'translateY(-4px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                       e.currentTarget.style.borderColor = `rgba(251, 146, 60, 0.15)`;
                       e.currentTarget.style.transform = 'translateY(0)';
                     }}>
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300"
                       style={{ background: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.2)' }}>
                    📦
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Barang Terjual</p>
                    <h3 className="text-xl font-black text-[#fdba74]">{stats.totalBarangTerjual} <span className="text-sm" style={{ color: 'rgba(253, 186, 116, 0.6)' }}>Pcs</span></h3>
                  </div>
                </div>
              </div>

              {/* TABEL PRODUK TERLARIS (BEST SELLER) */}
              <div className="flex-1 flex flex-col rounded-[16px] overflow-hidden"
                   style={{ border: `1px solid rgba(${aestheticGreenRGB}, 0.08)`, background: 'rgba(0,0,0,0.1)' }}>
                
                <div className="p-4 flex items-center gap-3" style={{ borderBottom: `1px solid rgba(${aestheticGreenRGB}, 0.15)`, background: 'rgba(10, 34, 24, 0.95)' }}>
                  <span className="text-xl">🔥</span>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
                    Peringkat Produk Terlaris
                  </h3>
                </div>
                
                <div className="overflow-x-auto overflow-y-auto flex-1">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead className="sticky top-0 z-10" style={{ background: 'rgba(10, 34, 24, 0.98)', borderBottom: `1px solid rgba(${aestheticGreenRGB}, 0.15)` }}>
                      <tr>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-center w-24" style={{ color: 'rgba(255,255,255,0.4)' }}>Rank</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>Nama Produk</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>Jumlah Terjual</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>Pendapatan</th>
                      </tr>
                    </thead>
                    <tbody style={{ divideY: '1px', borderColor: `rgba(${aestheticGreenRGB}, 0.05)` }}>
                      {stats.produkTerlaris.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-16">
                            <div style={{
                              width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto',
                              background: `rgba(${aestheticGreenRGB},0.1)`, border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: aestheticGreen, marginBottom: '16px'
                            }}>
                              <span className="text-2xl">📊</span>
                            </div>
                            <p className="font-bold text-[14px] text-white">Belum Ada Data</p>
                            <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Data penjualan akan muncul di sini.</p>
                          </td>
                        </tr>
                      ) : (
                        stats.produkTerlaris.map((produk, index) => (
                          <tr key={index} className="transition-colors group"
                              style={{ borderBottom: `1px solid rgba(${aestheticGreenRGB}, 0.05)` }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            <td className="px-6 py-4 text-center">
                              {index === 0 ? <span className="text-2xl drop-shadow-sm" title="Juara 1">🥇</span> : 
                               index === 1 ? <span className="text-2xl drop-shadow-sm" title="Juara 2">🥈</span> : 
                               index === 2 ? <span className="text-2xl drop-shadow-sm" title="Juara 3">🥉</span> : 
                               <span className="font-black px-3 py-1 rounded-[8px] text-[12px]" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)' }}>#{index + 1}</span>}
                            </td>
                            <td className="px-6 py-4 font-bold text-[13px]" style={{ color: '#ffffff' }}>
                              {produk.nama}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span 
                                className="px-3 py-1.5 rounded-[8px] font-bold text-[10px] tracking-wider inline-block"
                                style={{ background: `rgba(${aestheticGreenRGB}, 0.15)`, color: aestheticGreen, border: `1px solid rgba(${aestheticGreenRGB}, 0.25)` }}
                              >
                                {produk.terjual} Pcs
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right font-black text-[13px]" style={{ color: aestheticGreen }}>
                              Rp {produk.sumbanganPendapatan.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laporan;