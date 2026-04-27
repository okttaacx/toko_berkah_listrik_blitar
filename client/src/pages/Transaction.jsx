import React from 'react';
import Sidebar from '../components/Sidebar';
import AdminTransactionView from '../components/AdminTransactionView';
import CashierView from '../components/CashierView';
import bgKasir from '../assets/bg-kasir.jpg';

const Transaction = () => {
  const role = localStorage.getItem('role');

  // ── KASIR: Full screen ──
  if (role === 'kasir') {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: "'Poppins', sans-serif",
          backgroundImage: `url(${bgKasir})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        `}</style>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 25, 15, 0.55)',
            backdropFilter: 'blur(2px)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <CashierView />
        </div>
      </div>
    );
  }

  // ── ADMIN: Dark Aesthetic Green dengan Sidebar (TANPA ANIMASI) ──
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #061810 0%, #0a2218 60%, #07150f 100%)',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(134,239,172,0.3); border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(134,239,172,0.5); }
      `}</style>

      <Sidebar />

      {/* ── Area Konten Utama ── */}
      <div style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        padding: '24px 24px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        zIndex: 2,
      }}>
        <AdminTransactionView />
      </div>
    </div>
  );
};

export default Transaction;