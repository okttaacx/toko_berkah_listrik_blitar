import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminTransactionView = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATE UNTUK FILTER
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterBulan, setFilterBulan] = useState('semua');
  const [filterTahun, setFilterTahun] = useState('semua');

  // 🎨 Design Tokens (Tema Dark Aesthetic Green)
  const aestheticGreen    = '#86efac';
  const aestheticGreenRGB = '134, 239, 172';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Gagal ambil riwayat transaksi', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ─────────────────────────────────────────────────────────────
  //  FITUR CETAK ULANG STRUK — DESAIN PREMIUM
  // ─────────────────────────────────────────────────────────────
  const reprintReceipt = (trx) => {
    const tanggal = new Date(trx.createdAt).toLocaleString('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
    const kasirNama    = trx.kasir?.nama || 'Kasir';
    const transactionId = trx._id;
    const total        = trx.total_harga;

    const printWindow = window.open('', '_blank', 'width=460,height=720');

    const htmlStruk = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <title>Nota #${transactionId.slice(-6).toUpperCase()} — Berkah Listrik</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    /* ── RESET ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── PAGE ── */
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

    /* ── OUTER WRAPPER ── */
    .receipt {
      background: #fff;
      border: 2px solid #0d0d0d;
      padding: 28px 26px 24px;
      position: relative;
    }

    /* ── DECORATIVE CORNER DOTS ── */
    .receipt::before,
    .receipt::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #0d0d0d;
    }
    .receipt::before { top: -5px; left: -5px; }
    .receipt::after  { bottom: -5px; right: -5px; }
    .corner-tr, .corner-bl {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #0d0d0d;
    }
    .corner-tr { top: -5px; right: -5px; }
    .corner-bl { bottom: -5px; left: -5px; }

    /* ── HEADER ── */
    .header {
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 2px solid #0d0d0d;
    }
    .bolt {
      font-size: 28px;
      display: block;
      margin-bottom: 4px;
      animation: none;
    }
    .store-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      line-height: 1.1;
      margin-bottom: 8px;
    }
    .store-tagline {
      font-size: 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 10px;
    }
    .store-address {
      font-size: 9.5px;
      color: #444;
      line-height: 1.7;
    }
    .store-phone {
      margin-top: 4px;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #0d0d0d;
    }

    /* ── COPY BADGE ── */
    .copy-badge {
      display: inline-block;
      margin-top: 12px;
      padding: 4px 14px;
      border: 1.5px dashed #aaa;
      font-size: 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #888;
      border-radius: 100px;
    }

    /* ── DIVIDERS ── */
    .divider-thick { border: none; border-top: 2px solid #0d0d0d; margin: 14px 0; }
    .divider-dash  { border: none; border-top: 1.5px dashed #ccc; margin: 12px 0; }
    .divider-dot   {
      text-align: center;
      font-size: 9px;
      letter-spacing: 4px;
      color: #bbb;
      margin: 10px 0;
    }

    /* ── META ROWS ── */
    .meta-section { margin: 12px 0; }
    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 5px 0;
      gap: 8px;
    }
    .meta-label {
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #888;
      white-space: nowrap;
    }
    .meta-dots {
      flex: 1;
      border-bottom: 1px dotted #ccc;
      margin: 0 6px;
      margin-bottom: 3px;
    }
    .meta-value {
      font-size: 10.5px;
      font-weight: 700;
      text-align: right;
      color: #0d0d0d;
    }

    /* ── SECTION TITLE ── */
    .section-title {
      font-size: 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #aaa;
      text-align: center;
      margin: 14px 0 10px;
    }

    /* ── ITEMS ── */
    .item {
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    .item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .item-name {
      font-size: 11.5px;
      font-weight: 700;
      margin-bottom: 3px;
      color: #0d0d0d;
      line-height: 1.3;
    }
    .item-calc {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #777;
    }
    .item-subtotal { font-weight: 700; color: #0d0d0d; }

    /* ── TOTAL BOX ── */
    .total-wrapper { margin-top: 14px; }
    .total-box {
      background: #0d0d0d;
      color: #fff;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-label {
      font-size: 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #86efac;
    }
    .total-amount {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 900;
      color: #86efac;
      letter-spacing: 0.5px;
    }

    /* ── FOOTER ── */
    .footer {
      text-align: center;
      margin-top: 18px;
      padding-top: 14px;
      border-top: 2px solid #0d0d0d;
    }
    .footer-thanks {
      font-family: 'Playfair Display', serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .footer-note {
      font-size: 9px;
      color: #888;
      line-height: 1.8;
      letter-spacing: 0.3px;
    }
    .footer-brand {
      margin-top: 10px;
      font-size: 8px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #ccc;
    }

    /* ── ZIGZAG BOTTOM ── */
    .zigzag-wrapper {
      overflow: hidden;
      height: 14px;
      margin-top: -1px;
    }
    .zigzag-wrapper svg { display: block; }
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
      <span class="copy-badge">⎘ copy receipt · cetak ulang</span>
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
        <span class="meta-value">${kasirNama}</span>
      </div>
    </div>

    <hr class="divider-thick"/>

    <!-- ITEMS -->
    <div class="section-title">✦ Detail Pembelian ✦</div>
    <div class="items-list">
      ${trx.barang_dibeli.map((item) => `
        <div class="item">
          <div class="item-name">${item.produk?.nama_barang || 'Barang Dihapus'}</div>
          <div class="item-calc">
            <span>${item.jumlah} pcs &times; Rp ${item.harga_satuan.toLocaleString('id-ID')}</span>
            <span class="item-subtotal">Rp ${(item.jumlah * item.harga_satuan).toLocaleString('id-ID')}</span>
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
</html>`;

    printWindow.document.write(htmlStruk);
    printWindow.document.close();
  };

  // ─────────────────────────────────────────────────────────────
  //  LOGIKA FILTERING
  // ─────────────────────────────────────────────────────────────
  const filteredTransactions = transactions.filter((trx) => {
    const trxDate = new Date(trx.createdAt);

    if (filterTanggal) {
      const y  = trxDate.getFullYear();
      const m  = String(trxDate.getMonth() + 1).padStart(2, '0');
      const d  = String(trxDate.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}` === filterTanggal;
    }

    let isMatchBulan = true;
    let isMatchTahun = true;
    if (filterBulan !== 'semua') isMatchBulan = trxDate.getMonth().toString() === filterBulan;
    if (filterTahun !== 'semua') isMatchTahun = trxDate.getFullYear().toString() === filterTahun;
    return isMatchBulan && isMatchTahun;
  });

  const totalPendapatan = filteredTransactions.reduce((acc, curr) => acc + curr.total_harga, 0);

  const resetFilter = () => {
    setFilterTanggal('');
    setFilterBulan('semua');
    setFilterTahun('semua');
  };

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      className="p-6 md:p-8 rounded-[24px] overflow-hidden flex flex-col relative"
      style={{
        background: 'rgba(12, 36, 24, 0.72)',
        border: `1px solid rgba(${aestheticGreenRGB}, 0.12)`,
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        height: 'calc(100vh - 48px)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3
            className="text-[20px] font-bold tracking-wide flex items-center gap-3"
            style={{ color: '#ffffff' }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-[12px]"
              style={{
                background: `rgba(${aestheticGreenRGB}, 0.1)`,
                border: `1px solid rgba(${aestheticGreenRGB}, 0.2)`,
                color: aestheticGreen,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Riwayat Penjualan
          </h3>
          <p
            className="text-[12px] font-medium tracking-wider mt-1"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Gunakan filter di bawah untuk melihat laporan spesifik.
          </p>
        </div>

        {/* BADGE STATISTIK */}
        <div
          className="px-5 py-2.5 rounded-[16px] flex flex-col justify-center text-right"
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: `1px solid rgba(${aestheticGreenRGB}, 0.15)`,
          }}
        >
          <div
            className="flex justify-end items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <span>{filteredTransactions.length} Transaksi</span>
          </div>
          <div className="font-black text-lg leading-none" style={{ color: aestheticGreen }}>
            Rp {totalPendapatan.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* ── AREA FILTER ── */}
      <div
        className="flex flex-wrap gap-3 mb-6 p-4 rounded-[16px] items-center"
        style={{
          background: 'rgba(0,0,0,0.15)',
          border: `1px solid rgba(${aestheticGreenRGB}, 0.08)`,
        }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest mr-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          Filter:
        </span>

        {/* Tanggal */}
        <input
          type="date"
          value={filterTanggal}
          onChange={(e) => {
            setFilterTanggal(e.target.value);
            setFilterBulan('semua');
            setFilterTahun('semua');
          }}
          className="px-3 py-2 rounded-[12px] text-[12px] outline-none font-medium transition-all"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid rgba(${aestheticGreenRGB},0.15)`,
            color: filterTanggal ? '#fff' : 'rgba(255,255,255,0.5)',
            colorScheme: 'dark',
          }}
          onFocus={(e) => (e.target.style.borderColor = aestheticGreen)}
          onBlur={(e) => (e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.15)`)}
        />

        <span
          className="text-[10px] font-bold tracking-widest mx-1"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          ATAU
        </span>

        {/* Bulan */}
        <select
          value={filterBulan}
          onChange={(e) => { setFilterBulan(e.target.value); setFilterTanggal(''); }}
          className="px-3 py-2 rounded-[12px] text-[12px] outline-none font-medium transition-all cursor-pointer"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid rgba(${aestheticGreenRGB},0.15)`,
            color: filterBulan !== 'semua' ? '#fff' : 'rgba(255,255,255,0.6)',
          }}
          onFocus={(e) => (e.target.style.borderColor = aestheticGreen)}
          onBlur={(e) => (e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.15)`)}
        >
          {['semua','0','1','2','3','4','5','6','7','8','9','10','11'].map((v, i) => (
            <option key={v} value={v} className="bg-[#0a2218] text-white">
              {['Semua Bulan','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][i]}
            </option>
          ))}
        </select>

        {/* Tahun */}
        <select
          value={filterTahun}
          onChange={(e) => { setFilterTahun(e.target.value); setFilterTanggal(''); }}
          className="px-3 py-2 rounded-[12px] text-[12px] outline-none font-medium transition-all cursor-pointer"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid rgba(${aestheticGreenRGB},0.15)`,
            color: filterTahun !== 'semua' ? '#fff' : 'rgba(255,255,255,0.6)',
          }}
          onFocus={(e) => (e.target.style.borderColor = aestheticGreen)}
          onBlur={(e) => (e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.15)`)}
        >
          <option value="semua" className="bg-[#0a2218] text-white">Semua Tahun</option>
          <option value="2026" className="bg-[#0a2218] text-white">2026</option>
          <option value="2025" className="bg-[#0a2218] text-white">2025</option>
        </select>

        {/* Reset */}
        {(filterTanggal || filterBulan !== 'semua' || filterTahun !== 'semua') && (
          <button
            onClick={resetFilter}
            className="text-[10px] font-bold uppercase tracking-widest ml-auto px-3 py-2 rounded-[10px] transition-all"
            style={{
              background: 'rgba(239,68,68,0.1)',
              color: '#fca5a5',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
          >
            ✖ Reset Filter
          </button>
        )}
      </div>

      {/* ── AREA TABEL ── */}
      <div
        className="overflow-x-auto overflow-y-auto flex-1 rounded-[16px]"
        style={{
          border: `1px solid rgba(${aestheticGreenRGB}, 0.08)`,
          background: 'rgba(0,0,0,0.1)',
        }}
      >
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead
            className="sticky top-0 z-10"
            style={{
              background: 'rgba(10,34,24,0.98)',
              borderBottom: `1px solid rgba(${aestheticGreenRGB},0.15)`,
            }}
          >
            <tr>
              {['ID Nota', 'Waktu Transaksi', 'Kasir', 'Total Bayar', 'Aksi'].map((h, i) => (
                <th
                  key={h}
                  className={`px-6 py-4 text-[10px] uppercase tracking-widest font-bold${i === 3 ? ' text-right' : i === 4 ? ' text-center' : ''}`}
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Memuat data... ⏳
                  </span>
                </td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-16">
                  <div className="w-full flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-3 opacity-30">📭</span>
                    <p className="font-bold text-[14px]" style={{ color: '#ffffff' }}>Tidak ada transaksi.</p>
                    <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Coba ubah atau reset filter Anda.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((trx) => (
                <tr
                  key={trx._id}
                  className="transition-colors"
                  style={{ borderBottom: `1px solid rgba(${aestheticGreenRGB},0.05)` }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* ID Nota */}
                  <td className="px-6 py-4 font-mono text-[11px] font-bold" style={{ color: '#93c5fd' }}>
                    #{trx._id.slice(-6).toUpperCase()}
                  </td>

                  {/* Waktu */}
                  <td className="px-6 py-4 text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(trx.createdAt).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </td>

                  {/* Kasir */}
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1.5 rounded-[8px] font-bold text-[9px] tracking-widest uppercase inline-block"
                      style={{
                        background: `rgba(${aestheticGreenRGB},0.1)`,
                        color: aestheticGreen,
                        border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
                      }}
                    >
                      {trx.kasir?.nama || 'Anonim'}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-right font-black text-[13px]" style={{ color: aestheticGreen }}>
                    Rp {trx.total_harga.toLocaleString('id-ID')}
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => reprintReceipt(trx)}
                      className="px-4 py-2 rounded-[10px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 mx-auto active:scale-95"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.6)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `rgba(${aestheticGreenRGB},0.15)`;
                        e.currentTarget.style.borderColor = `rgba(${aestheticGreenRGB},0.3)`;
                        e.currentTarget.style.color = aestheticGreen;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
      </svg>
                      Cetak / PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionView;