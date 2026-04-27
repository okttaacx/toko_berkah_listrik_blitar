import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import bgKasir from '../assets/bg-kasir.jpg';

const CashierView = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [toast, setToast] = useState({ show: false, msg: '' });
  const navigate = useNavigate();

  const namaKasir = localStorage.getItem('namaUser') || 'Kasir';

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Gagal ambil produk', err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2200);
  };

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar dari sesi kasir?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('namaUser');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  const categories = ['all', ...new Set(products.map((p) => p.kategori || 'UMUM'))];

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.nama_barang.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || (p.kategori || 'UMUM') === activeCategory;
    return matchSearch && matchCat;
  });

  const addToCart = (product) => {
    if (product.stok <= 0) { showToast(`Stok ${product.nama_barang} habis!`); return; }
    const exist = cart.find((i) => i._id === product._id);
    if (exist) {
      if (exist.qty >= product.stok) { showToast(`Maks stok ${product.nama_barang}: ${product.stok}`); return; }
      setCart(cart.map((i) => i._id === product._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    showToast(`${product.nama_barang} ditambahkan ✓`);
  };

  const updateQuantity = (product, delta) => {
    const exist = cart.find((i) => i._id === product._id);
    if (!exist) return;
    const newQty = exist.qty + delta;
    if (newQty <= 0) { setCart(cart.filter((i) => i._id !== product._id)); return; }
    if (newQty > product.stok) { showToast(`Maks stok ${product.nama_barang}: ${product.stok}`); return; }
    setCart(cart.map((i) => i._id === product._id ? { ...i, qty: newQty } : i));
  };

  const totalPrice = cart.reduce((a, c) => a + c.harga * c.qty, 0);
  const totalQty   = cart.reduce((a, c) => a + c.qty, 0);

  // ─────────────────────────────────────────────────────────────
  //  CETAK STRUK — DESAIN PREMIUM (SERAGAM DENGAN ADMIN VIEW)
  // ─────────────────────────────────────────────────────────────
  const printReceipt = (transactionId, cartData, total) => {
    const tanggal  = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const printWin = window.open('', '_blank', 'width=460,height=720');
    if (!printWin) { showToast('Pop-up diblokir browser, izinkan pop-up terlebih dahulu.'); return; }

    printWin.document.write(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <title>Nota #${transactionId.slice(-6).toUpperCase()} — Berkah Listrik</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @page { size: 80mm auto; margin: 0; }

    body {
      font-family: 'Space Mono', 'Courier New', monospace;
      font-size: 11px;
      background: #ffffff;
      color: #0d0d0d;
      width: 360px;
      margin: 0 auto;
      padding: 0;
    }

    .receipt {
      background: #fff;
      border: 2px solid #0d0d0d;
      padding: 28px 26px 24px;
      position: relative;
    }

    /* Sudut dekoratif */
    .receipt::before,
    .receipt::after {
      content: '';
      position: absolute;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #0d0d0d;
    }
    .receipt::before { top: -5px; left: -5px; }
    .receipt::after  { bottom: -5px; right: -5px; }
    .corner-tr, .corner-bl {
      position: absolute;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #0d0d0d;
    }
    .corner-tr { top: -5px; right: -5px; }
    .corner-bl { bottom: -5px; left: -5px; }

    /* Header */
    .header {
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 2px solid #0d0d0d;
    }
    .bolt { font-size: 28px; display: block; margin-bottom: 4px; }
    .store-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px; font-weight: 900;
      letter-spacing: 2px; text-transform: uppercase;
      line-height: 1.1; margin-bottom: 8px;
    }
    .store-tagline {
      font-size: 8px; letter-spacing: 3px;
      text-transform: uppercase; color: #555; margin-bottom: 10px;
    }
    .store-address { font-size: 9.5px; color: #444; line-height: 1.7; }
    .store-phone   { margin-top: 4px; font-size: 9.5px; font-weight: 700; letter-spacing: 1px; color: #0d0d0d; }
    .copy-badge {
      display: inline-block; margin-top: 12px; padding: 4px 14px;
      border: 1.5px dashed #aaa; font-size: 8px; letter-spacing: 3px;
      text-transform: uppercase; color: #888; border-radius: 100px;
    }

    /* Dividers */
    .divider-thick { border: none; border-top: 2px solid #0d0d0d; margin: 14px 0; }
    .divider-dash  { border: none; border-top: 1.5px dashed #ccc; margin: 12px 0; }

    /* Meta rows */
    .meta-section { margin: 12px 0; }
    .meta-row {
      display: flex; justify-content: space-between;
      align-items: baseline; margin: 5px 0; gap: 8px;
    }
    .meta-label {
      font-size: 9px; letter-spacing: 1.5px;
      text-transform: uppercase; color: #888; white-space: nowrap;
    }
    .meta-dots {
      flex: 1; border-bottom: 1px dotted #ccc;
      margin: 0 6px; margin-bottom: 3px;
    }
    .meta-value { font-size: 10.5px; font-weight: 700; text-align: right; color: #0d0d0d; }

    /* Section title */
    .section-title {
      font-size: 8px; letter-spacing: 3px;
      text-transform: uppercase; color: #aaa;
      text-align: center; margin: 14px 0 10px;
    }

    /* Items */
    .item {
      margin-bottom: 10px; padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    .item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .item-name { font-size: 11.5px; font-weight: 700; margin-bottom: 3px; color: #0d0d0d; line-height: 1.3; }
    .item-calc { display: flex; justify-content: space-between; font-size: 10px; color: #777; }
    .item-subtotal { font-weight: 700; color: #0d0d0d; }

    /* Total box */
    .total-wrapper { margin-top: 14px; }
    .total-box {
      background: #0d0d0d; color: #fff;
      border-radius: 8px; padding: 12px 16px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .total-label { font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: #86efac; }
    .total-amount {
      font-family: 'Playfair Display', serif;
      font-size: 18px; font-weight: 900; color: #86efac; letter-spacing: 0.5px;
    }

    /* Footer */
    .footer {
      text-align: center; margin-top: 18px;
      padding-top: 14px; border-top: 2px solid #0d0d0d;
    }
    .footer-thanks {
      font-family: 'Playfair Display', serif;
      font-size: 14px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px;
    }
    .footer-note { font-size: 9px; color: #888; line-height: 1.8; letter-spacing: 0.3px; }
    .footer-brand { margin-top: 10px; font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: #ccc; }
  </style>
</head>
<body>
  <div class="receipt">
    <span class="corner-tr"></span>
    <span class="corner-bl"></span>

    <!-- HEADER -->
    <div class="header">
      <span class="bolt">⚡</span>
      <div class="store-name">Berkah Listrik</div>
      <div class="store-tagline">Toko Material Elektrikal</div>
      <div class="store-address">
        Kendalrejo, Kec. Talun<br/>
        Kabupaten Blitar, Jawa Timur 66183
      </div>
      <div class="store-phone">☎ 0888-5963-424</div>
      <span class="copy-badge">✦ struk resmi pembelian</span>
    </div>

    <!-- META INFO -->
    <div class="meta-section">
      <div class="meta-row">
        <span class="meta-label">No. Nota</span>
        <span class="meta-dots"></span>
        <span class="meta-value">#${transactionId.slice(-6).toUpperCase()}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Tanggal</span>
        <span class="meta-dots"></span>
        <span class="meta-value">${tanggal}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Kasir</span>
        <span class="meta-dots"></span>
        <span class="meta-value">${namaKasir}</span>
      </div>
    </div>

    <hr class="divider-thick"/>

    <!-- ITEMS -->
    <div class="section-title">✦ Detail Pembelian ✦</div>
    <div class="items-list">
      ${cartData.map((item) => `
        <div class="item">
          <div class="item-name">${item.nama_barang}</div>
          <div class="item-calc">
            <span>${item.qty} pcs &times; Rp ${item.harga.toLocaleString('id-ID')}</span>
            <span class="item-subtotal">Rp ${(item.qty * item.harga).toLocaleString('id-ID')}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- TOTAL -->
    <hr class="divider-dash"/>
    <div class="total-wrapper">
      <div class="total-box">
        <span class="total-label">Total Bayar</span>
        <span class="total-amount">Rp ${total.toLocaleString('id-ID')}</span>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-thanks">✦ Terima Kasih ✦</div>
      <div class="footer-note">
        Barang yang sudah dibeli tidak dapat<br/>
        ditukar atau dikembalikan.
      </div>
      <div class="footer-brand">— berkah listrik • blitar —</div>
    </div>
  </div>

  <script>
    window.onload = function () {
      window.print();
      setTimeout(function () { window.close(); }, 700);
    };
  </script>
</body>
</html>`);

    printWin.document.close();
  };

  // ─────────────────────────────────────────────────────────────
  //  CHECKOUT
  // ─────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const barang_dibeli = cart.map((i) => ({ produk: i._id, jumlah: i.qty }));
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/transactions',
        { barang_dibeli },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const transactionId = response.data.data._id;
      printReceipt(transactionId, cart, totalPrice);
      showToast('Pembayaran berhasil! Struk sedang dicetak.');
      setCart([]);
      fetchProducts();
    } catch (error) {
      showToast('Gagal: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  //  DESIGN TOKENS
  // ─────────────────────────────────────────────────────────────
  const aestheticGreen     = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB  = '134, 239, 172';

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: '100vw', height: '100vh',
        position: 'fixed', top: 0, left: 0,
        backgroundImage: `url(${bgKasir})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', zIndex: 0, overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 24, 16, 0.78)', backdropFilter: 'blur(3px)', zIndex: 1 }} />

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', padding: '16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Dekorasi blur */}
        <div className="pointer-events-none absolute top-[-80px] right-[-40px] w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.15) 0%, transparent 70%)` }} />
        <div className="pointer-events-none absolute bottom-[-60px] left-[120px] w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.10) 0%, transparent 70%)` }} />

        {/* Toast */}
        <div
          className="absolute left-1/2 z-50 px-5 py-2.5 rounded-xl text-[13px] pointer-events-none transition-all duration-300 shadow-xl flex items-center gap-2"
          style={{
            transform: `translateX(-50%) translateY(${toast.show ? '20px' : '-80px'})`,
            background: 'rgba(10, 36, 24, 0.95)',
            border: `1px solid rgba(${aestheticGreenRGB},0.4)`,
            color: aestheticGreen, whiteSpace: 'nowrap',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg>
          {toast.msg}
        </div>

        {/* ══ HEADER ══ */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0 px-2 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-lg"
              style={{ background: `rgba(${aestheticGreenRGB},0.15)`, border: `1px solid rgba(${aestheticGreenRGB},0.3)`, color: aestheticGreen }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-white tracking-wide leading-tight font-mono">BERKAH LISTRIK</h1>
              <p className="text-[11px] text-white/50 tracking-wider uppercase mt-0.5">Sistem Kasir Modern</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-[14px]"
              style={{ background: 'rgba(12, 36, 24, 0.6)', border: `1px solid rgba(${aestheticGreenRGB},0.2)`, backdropFilter: 'blur(16px)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${aestheticGreenRGB},0.15)`, color: aestheticGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-white/50 uppercase font-bold tracking-widest mb-0.5">Kasir Aktif</p>
                <p className="text-[12px] font-semibold leading-none" style={{ color: aestheticGreen }}>{namaKasir}</p>
              </div>
            </div>

            <button onClick={handleLogout}
              className="h-[46px] px-4 rounded-[14px] flex items-center justify-center gap-2 transition-all"
              style={{ background: 'rgba(220, 50, 50, 0.1)', border: '1px solid rgba(220, 50, 50, 0.3)', color: '#ff8a8a' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220, 50, 50, 0.8)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220, 50, 50, 0.1)'; e.currentTarget.style.color = '#ff8a8a'; }}
            >
              <span className="text-[11px] font-bold tracking-widest uppercase hidden sm:block">Keluar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ══ KONTEN UTAMA ══ */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* KIRI: KATALOG */}
          <div className="flex-[2] flex flex-col gap-4 p-5 rounded-[24px] min-w-0"
            style={{ background: 'rgba(12, 36, 24, 0.75)', border: `1px solid rgba(${aestheticGreenRGB},0.15)`, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}>

            <div className="flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-[16px] font-semibold text-white/95 tracking-wide">Katalog Produk</h2>
                <p className="text-[11px] text-white/40 mt-0.5">{filteredProducts.length} produk tersedia</p>
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0 flex-col sm:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </span>
                <input type="text" placeholder="Cari alat listrik..." value={search}
                  className="w-full pl-10 pr-4 py-3 rounded-[14px] text-[12px] outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.95)' }}
                  onFocus={(e) => { e.target.style.background = `rgba(${aestheticGreenRGB},0.08)`; e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.4)`; e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`; }}
                  onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-[11px] font-medium transition-all cursor-pointer tracking-wide"
                    style={{
                      background: activeCategory === cat ? `rgba(${aestheticGreenRGB},0.2)` : 'rgba(255,255,255,0.05)',
                      border: activeCategory === cat ? `1px solid rgba(${aestheticGreenRGB},0.4)` : '1px solid rgba(255,255,255,0.08)',
                      color: activeCategory === cat ? aestheticGreen : 'rgba(255,255,255,0.5)',
                    }}
                    onMouseEnter={(e) => { if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={(e) => { if (activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    {cat === 'all' ? 'Semua Produk' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pb-2 mt-2" style={{ scrollbarWidth: 'thin', scrollbarColor: `rgba(${aestheticGreenRGB},0.3) transparent` }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((item) => {
                  const outOfStock = item.stok <= 0;
                  return (
                    <div key={item._id} onClick={() => addToCart(item)}
                      className={`relative flex flex-col p-4 rounded-[18px] transition-all duration-200 ${outOfStock ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}`}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onMouseEnter={(e) => {
                        if (!outOfStock) {
                          e.currentTarget.style.background = `rgba(${aestheticGreenRGB},0.08)`;
                          e.currentTarget.style.borderColor = `rgba(${aestheticGreenRGB},0.3)`;
                          e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(${aestheticGreenRGB},0.1) inset`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[8px] text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: `rgba(${aestheticGreenRGB},0.15)`, border: `1px solid rgba(${aestheticGreenRGB},0.2)`, color: aestheticGreen }}>
                        {item.kategori || 'UMUM'}
                      </div>
                      {outOfStock && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-[8px] text-[9px] font-bold tracking-wider"
                          style={{ background: 'rgba(220,50,50,0.8)', color: '#fff' }}>
                          HABIS
                        </div>
                      )}
                      <div className="mt-8 mb-3">
                        <div className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-3"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>
                          {item.gambar ? (
                            <img src={`http://localhost:5000${item.gambar}`} className="w-full h-full object-contain mix-blend-screen p-1" alt={item.nama_barang} />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                            </svg>
                          )}
                        </div>
                        <h4 className="text-[13px] font-medium text-white/90 leading-snug mb-1.5 line-clamp-2 min-h-[36px]">{item.nama_barang}</h4>
                        <p className="text-[14px] font-bold tracking-wide" style={{ color: aestheticGreen }}>
                          Rp {item.harga.toLocaleString('id-ID')}
                        </p>
                        <p className={`text-[10px] mt-2 font-medium ${item.stok <= 5 && item.stok > 0 ? 'text-[#fca5a5]' : 'text-white/40'}`}>
                          Sisa Stok: {item.stok}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* KANAN: KERANJANG */}
          <div className="w-[320px] lg:w-[350px] flex-shrink-0 flex flex-col p-5 rounded-[24px]"
            style={{ background: 'rgba(12, 36, 24, 0.75)', border: `1px solid rgba(${aestheticGreenRGB},0.15)`, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}>

            <div className="flex items-center gap-3 pb-4 mb-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${aestheticGreenRGB},0.15)`, border: `1px solid rgba(${aestheticGreenRGB},0.3)`, color: aestheticGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-white/95 tracking-wide">Keranjang</p>
                <p className="text-[11px] text-white/40 mt-0.5">Daftar item terpilih</p>
              </div>
              <div className="px-3 py-1.5 rounded-[10px] text-[11px] font-bold flex-shrink-0 tracking-wide"
                style={{ background: `rgba(${aestheticGreenRGB},0.15)`, border: `1px solid rgba(${aestheticGreenRGB},0.3)`, color: aestheticGreen }}>
                {totalQty} Item
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: `rgba(${aestheticGreenRGB},0.3) transparent` }}>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3" style={{ opacity: 0.4 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                  <p className="text-[13px] text-white font-medium tracking-wide">Keranjang masih kosong</p>
                  <p className="text-[11px] text-white/60 text-center px-4">Pilih produk di katalog untuk mulai transaksi</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="p-3.5 rounded-[16px]"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <p className="text-[12px] font-medium text-white/90 leading-snug flex-1">{item.nama_barang}</p>
                      <p className="text-[12px] font-bold whitespace-nowrap" style={{ color: aestheticGreen }}>
                        Rp {(item.qty * item.harga).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] text-white/40">Rp {item.harga.toLocaleString('id-ID')} / pcs</p>
                      <div className="flex items-center rounded-[10px] p-1" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item, -1); }}
                          className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[16px] text-white/70 transition-all hover:bg-white/10 hover:text-white">−</button>
                        <span className="w-8 text-center text-[12px] font-bold text-white/95">{item.qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item, 1); }}
                          className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[16px] text-white/70 transition-all hover:bg-white/10 hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex-shrink-0 pt-4 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-4 rounded-[16px] mb-4"
                style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(${aestheticGreenRGB},0.15)` }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] text-white/50 tracking-wide">Total Item</span>
                  <span className="text-[11px] text-white/80 font-semibold">{totalQty} Pcs</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[13px] font-medium text-white/80 tracking-wide">Total Tagihan</span>
                  <span className="text-[22px] font-bold leading-none tracking-wide" style={{ color: aestheticGreen }}>
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button onClick={handleCheckout} disabled={cart.length === 0 || loading}
                className="w-full py-4 rounded-[14px] text-[13px] font-bold tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{
                  background: cart.length === 0 || loading ? `rgba(${aestheticGreenRGB},0.3)` : `linear-gradient(135deg, ${aestheticGreen} 0%, ${aestheticGreenDark} 100%)`,
                  color: cart.length === 0 || loading ? 'rgba(255,255,255,0.4)' : '#022c16',
                  cursor: cart.length === 0 || loading ? 'not-allowed' : 'pointer',
                  boxShadow: cart.length === 0 || loading ? 'none' : `0 6px 20px rgba(${aestheticGreenRGB},0.4)`,
                }}
                onMouseEnter={(e) => { if (!loading && cart.length > 0) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(${aestheticGreenRGB},0.5)`; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = loading || cart.length === 0 ? 'none' : `0 6px 20px rgba(${aestheticGreenRGB},0.4)`; }}
              >
                {loading ? (
                  <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span><span>MEMPROSES...</span></>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                      <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
                    </svg>
                    <span>BAYAR SEKARANG</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::placeholder { color: rgba(255,255,255,0.3) !important; }
      `}</style>
    </div>
  );
};

export default CashierView;