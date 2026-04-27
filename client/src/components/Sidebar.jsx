import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  // ✅ Selaras dengan CashierView
  const aestheticGreen = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB = '134, 239, 172';

  const namaUser = localStorage.getItem('namaUser') || (role === 'admin' ? 'Admin' : 'Kasir');

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, icon, label, active }) => (
    <Link
      to={to}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '11px 14px',
        borderRadius: '14px',
        border: active
          ? `1px solid rgba(${aestheticGreenRGB}, 0.3)`
          : '1px solid transparent',
        background: active
          ? `rgba(${aestheticGreenRGB}, 0.13)`
          : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.2s',
        fontFamily: "'Poppins', sans-serif",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = `rgba(${aestheticGreenRGB}, 0.06)`;
          e.currentTarget.style.borderColor = `rgba(${aestheticGreenRGB}, 0.15)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
        }
      }}
    >
      {/* Garis aksen kiri aktif */}
      {active && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '40%',
          background: aestheticGreen,
          borderRadius: '0 4px 4px 0',
          boxShadow: `0 0 8px ${aestheticGreen}`,
        }} />
      )}

      <div style={{ color: active ? aestheticGreen : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{
        fontSize: '12.5px',
        fontWeight: 600,
        color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
        letterSpacing: '0.3px',
        fontFamily: "'Poppins', sans-serif",
      }}>
        {label}
      </span>
    </Link>
  );

  return (
    <div className="hidden md:flex w-[280px] h-screen flex-shrink-0 p-5 bg-transparent"
      style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ✅ Dark Glassmorphism — selaras CashierView */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '28px',
        overflow: 'hidden',
        background: 'rgba(12, 36, 24, 0.82)',
        border: `1px solid rgba(${aestheticGreenRGB}, 0.13)`,
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        boxShadow: `0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(${aestheticGreenRGB}, 0.05)`,
      }}>

        {/* Dekorasi blur hijau — sama persis dengan CashierView */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.12) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '40px', left: '-60px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Konten Z-index */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 20px' }}>

          {/* LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '13px', flexShrink: 0,
              background: `rgba(${aestheticGreenRGB}, 0.13)`,
              border: `1px solid rgba(${aestheticGreenRGB}, 0.28)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: aestheticGreen,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '17px', fontWeight: 800, color: '#fff', letterSpacing: '3px', margin: 0, lineHeight: 1 }}>
                BERKAH
              </h2>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.38)', letterSpacing: '4px', textTransform: 'uppercase', margin: '4px 0 0', fontWeight: 500 }}>
                Sistem Toko
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.18), transparent)`, marginBottom: '20px' }} />

          {/* NAVIGASI */}
          <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '4px' }}>
            Menu Utama
          </p>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
            {role === 'admin' && (
              <>
                <NavItem to="/dashboard" label="Dashboard" active={isActive('/dashboard')}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>}
                />
                <NavItem to="/inventory" label="Daftar Barang" active={isActive('/inventory')}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.84L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/></svg>}
                />
                <NavItem to="/transaction" label="Riwayat Transaksi" active={isActive('/transaction')}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.5 7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/></svg>}
                />
                <NavItem to="/laporan" label="Laporan Data" active={isActive('/laporan')}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/></svg>}
                />
              </>
            )}
            {role === 'kasir' && (
              <NavItem to="/cashier" label="Sistem Kasir" active={isActive('/cashier')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>}
              />
            )}
          </nav>

          {/* BOTTOM: User Info + Logout */}
          <div style={{ paddingTop: '16px', marginTop: 'auto' }}>
            {/* User Box */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 14px', borderRadius: '14px', marginBottom: '10px',
              background: 'rgba(0,0,0,0.25)',
              border: `1px solid rgba(${aestheticGreenRGB}, 0.12)`,
            }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                background: `rgba(${aestheticGreenRGB}, 0.13)`,
                border: `1px solid rgba(${aestheticGreenRGB}, 0.25)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: aestheticGreen,
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, margin: '0 0 3px' }}>
                  {role === 'admin' ? 'Admin Aktif' : 'Kasir Aktif'}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 700, color: aestheticGreen, margin: 0 }}>
                  {namaUser}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 14px', borderRadius: '14px',
                background: 'rgba(220,50,50,0.08)',
                border: '1px solid rgba(220,50,50,0.25)',
                color: '#ff8a8a', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220,50,50,0.18)';
                e.currentTarget.style.borderColor = 'rgba(220,50,50,0.5)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(220,50,50,0.08)';
                e.currentTarget.style.borderColor = 'rgba(220,50,50,0.25)';
                e.currentTarget.style.color = '#ff8a8a';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Font Poppins Import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  );
};

export default Sidebar;