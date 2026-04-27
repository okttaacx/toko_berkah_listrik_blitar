import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import CardBarang from '../components/CardBarang';
import ModalBarang from '../components/ModalBarang';

const Dashboard = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nama_barang: '', kategori: 'Lampu', harga: '', stok: '', gambar: null,
  });

  const aestheticGreen     = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB  = '134, 239, 172';

  const fetchBarang = async () => {
    try {
      const response = await api.get('/products');
      setBarang(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBarang(); }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ nama_barang: '', kategori: 'Lampu', harga: '', stok: '', gambar: null });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setEditId(item._id);
    setFormData({
      nama_barang: item.nama_barang,
      kategori: item.kategori,
      harga: item.harga,
      stok: item.stok,
      gambar: null,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama_barang', formData.nama_barang);
    data.append('kategori',    formData.kategori);
    data.append('harga',       formData.harga);
    data.append('stok',        formData.stok);
    if (formData.gambar) data.append('gambar', formData.gambar);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (isEditMode) await api.put(`/products/${editId}`, data, config);
      else            await api.post('/products', data, config);
      fetchBarang();
      setIsModalOpen(false);
    } catch (err) {
      alert('Gagal menyimpan data: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus barang ini?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchBarang();
    } catch { alert('Gagal menghapus barang.'); }
  };

  const totalProduk     = barang.length;
  const totalStok       = barang.reduce((a, b) => a + (b.stok || 0), 0);
  const stokHampirHabis = barang.filter(b => b.stok > 0 && b.stok <= 5).length;
  const stokHabis       = barang.filter(b => b.stok <= 0).length;

  const statCards = [
    {
      val: totalProduk, lbl: 'Total Produk', badge: 'produk aktif',
      badgeColor: aestheticGreen,
      badgeBg: `rgba(${aestheticGreenRGB},0.1)`,
      badgeBorder: `rgba(${aestheticGreenRGB},0.2)`,
      iconBg: `rgba(${aestheticGreenRGB},0.12)`,
      iconColor: aestheticGreen,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6z"/>
        </svg>
      ),
    },
    {
      val: totalStok, lbl: 'Total Stok', badge: 'semua item',
      badgeColor: '#93c5fd',
      badgeBg: 'rgba(96,165,250,0.1)',
      badgeBorder: 'rgba(96,165,250,0.2)',
      iconBg: 'rgba(96,165,250,0.12)',
      iconColor: '#93c5fd',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      ),
    },
    {
      val: stokHampirHabis, lbl: 'Stok Menipis', badge: '≤ 5 pcs',
      badgeColor: '#fcd34d',
      badgeBg: 'rgba(251,191,36,0.1)',
      badgeBorder: 'rgba(251,191,36,0.2)',
      iconBg: 'rgba(251,191,36,0.12)',
      iconColor: '#fcd34d',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      ),
    },
    {
      val: stokHabis, lbl: 'Stok Habis', badge: 'perlu restock',
      badgeColor: '#fca5a5',
      badgeBg: 'rgba(252,165,165,0.1)',
      badgeBorder: 'rgba(252,165,165,0.2)',
      iconBg: 'rgba(252,165,165,0.12)',
      iconColor: '#fca5a5',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',                  // ✅ Sidebar tetap diam
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #061810 0%, #0a2218 60%, #07150f 100%)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* Style scrollbar untuk halaman */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(134,239,172,0.3); border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(134,239,172,0.5); }
      `}</style>

      <Sidebar />

      {/* ── KOLOM KANAN SCROLLABLE ── */}
      <div style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',                 // ✅ INI KUNCINYA: Seluruh kolom kanan bisa di-scroll
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 24px 24px 20px',
        gap: '20px',
        position: 'relative',
        boxSizing: 'border-box',
      }}>

        {/* Dekorasi glow */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.09) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '80px', width: '240px', height: '240px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.06) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

        {/* ── HEADER ── */}
        <div style={{
          flexShrink: 0,
          position: 'relative', zIndex: 2,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
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
                  <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
                </svg>
              </div>
              Inventory Berkah
            </h1>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '12px',
              color: 'rgba(255,255,255,0.35)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.5px',
            }}>
              Kelola stok barang dan inventaris tokomu di sini.
            </p>
          </div>

          <button
            onClick={openAddModal}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 20px', borderRadius: '14px',
              background: `linear-gradient(135deg, ${aestheticGreen} 0%, ${aestheticGreenDark} 100%)`,
              color: '#022c16', border: 'none', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              boxShadow: `0 6px 20px rgba(${aestheticGreenRGB},0.35)`,
              transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 10px 28px rgba(${aestheticGreenRGB},0.45)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 6px 20px rgba(${aestheticGreenRGB},0.35)`;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Tambah Barang
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{
          flexShrink: 0,
          position: 'relative', zIndex: 2,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px',
        }}>
          {statCards.map((s, i) => (
            <div key={i} style={{
              padding: '16px 18px', borderRadius: '18px',
              background: 'rgba(12,36,24,0.75)',
              border: `1px solid rgba(${aestheticGreenRGB},0.1)`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '70px', height: '70px', borderRadius: '50%',
                background: `radial-gradient(circle, ${s.iconBg} 0%, transparent 70%)`,
              }} />
              <div style={{
                width: '36px', height: '36px', borderRadius: '11px',
                background: s.iconBg, color: s.iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '12px',
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '22px',
                fontWeight: 800, color: '#fff', letterSpacing: '0.5px', lineHeight: 1,
              }}>
                {s.val}
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '10px',
                color: 'rgba(255,255,255,0.35)', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px',
              }}>
                {s.lbl}
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '9px', fontWeight: 700,
                padding: '3px 8px', borderRadius: '7px', marginTop: '8px',
                display: 'inline-block',
                background: s.badgeBg,
                border: `1px solid ${s.badgeBorder}`,
                color: s.badgeColor,
              }}>
                {s.badge}
              </div>
            </div>
          ))}
        </div>

        {/* ── PANEL PRODUK YANG MEMANJANG KE BAWAH ── */}
        <div style={{
          borderRadius: '24px',
          padding: '20px 22px',
          background: 'rgba(12,36,24,0.72)',
          border: `1px solid rgba(${aestheticGreenRGB},0.12)`,
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          position: 'relative', zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          // ✅ Hapus overflow: hidden dan minHeight di sini
        }}>

          {/* Header Panel */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '14px',
          }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '10px', fontWeight: 700,
              color: 'rgba(255,255,255,0.28)', letterSpacing: '3px', textTransform: 'uppercase', margin: 0,
            }}>
              Daftar Produk
            </p>
            <div style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '10px', fontWeight: 700,
              color: aestheticGreen,
              background: `rgba(${aestheticGreenRGB},0.1)`,
              border: `1px solid rgba(${aestheticGreenRGB},0.22)`,
              padding: '3px 12px', borderRadius: '8px',
            }}>
              {totalProduk} Produk
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.15), transparent)`,
            marginBottom: '16px',
          }} />

          {/* ── DAFTAR PRODUK (TIDAK SCROLL SENDIRI) ── */}
          <div style={{
            // ✅ Hapus flex: 1, minHeight, dan overflowY di sini
          }}>
            {loading ? (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                height: '200px', gap: '14px',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: `4px solid rgba(${aestheticGreenRGB},0.15)`,
                  borderTopColor: aestheticGreen,
                  animation: 'spin 1s linear infinite',
                }} />
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: '11px',
                  fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '2px', textTransform: 'uppercase',
                }}>
                  Memuat Data...
                </p>
              </div>

            ) : barang.length === 0 ? (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                height: '200px', gap: '12px',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '18px',
                  background: `rgba(${aestheticGreenRGB},0.1)`,
                  border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: aestheticGreen,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6z"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                  Belum Ada Barang
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                  Klik <span style={{ color: aestheticGreen, fontWeight: 600 }}>"Tambah Barang"</span> untuk mulai mengisi etalase.
                </p>
              </div>

            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '14px',
                paddingBottom: '8px',
              }}>
                {barang.map((item) => (
                  <CardBarang
                    key={item._id}
                    item={item}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalBarang
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Dashboard;