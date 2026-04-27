import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
// Gunakan background yang sama dengan Login
import bgKasir from '../assets/bg-kasir.jpg'; 

const Register = () => {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    role: 'kasir' // 🔒 KUNCI DI SINI: Default otomatis jadi kasir
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const showToast = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', formData);
      // Pindah ke login setelah sukses (bisa tambahkan toast success nanti di halaman login)
      alert('Akun Kasir berhasil dibuat! Silakan Login.');
      navigate('/'); 
    } catch (err) {
      showToast('Gagal daftar: ' + (err.response?.data?.message || 'Server Error'));
    } finally {
      setLoading(false);
    }
  };

  // Warna aesthetic green yang sama dengan Login
  const aestheticGreen = '#86efac';
  const aestheticGreenDark = '#34d399';
  const aestheticGreenRGB = '134, 239, 172';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundImage: `url(${bgKasir})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        overflow: 'hidden', // Mencegah scroll pada halaman utama
      }}
    >
      {/* Overlay gelap */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 24, 16, 0.78)', 
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
      />

      {/* Dekorasi blur hijau aesthetic */}
      <div
        className="pointer-events-none absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.2) 0%, transparent 70%)`,
          zIndex: 2,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-80px] left-[-40px] w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${aestheticGreenRGB},0.15) 0%, transparent 70%)`,
          zIndex: 2,
        }}
      />

      {/* Toast Error */}
      <div
        className="absolute left-1/2 z-50 px-5 py-2.5 rounded-xl text-[13px] pointer-events-none transition-all duration-300 shadow-xl"
        style={{
          transform: `translateX(-50%) translateY(${showError ? '24px' : '-80px'})`,
          background: 'rgba(80, 10, 10, 0.97)',
          border: '1px solid rgba(255,100,100,0.4)',
          color: '#ffaaaa',
          whiteSpace: 'nowrap',
          zIndex: 99,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ display: 'inline', marginRight: '6px', marginBottom: '2px' }}>
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        {error}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        {/* Card Form */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            background: 'rgba(12, 36, 24, 0.75)',
            border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderRadius: '24px',
            padding: '32px 32px 28px 32px', // Padding atas sedikit dikurangi untuk mengimbangi tambahan input Nama
            boxSizing: 'border-box',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0px)' : 'translateY(20px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            boxShadow: `0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(${aestheticGreenRGB},0.08)`,
          }}
        >
          {/* Logo & Title */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            {/* Icon Circle */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `rgba(${aestheticGreenRGB},0.15)`,
                border: `1px solid rgba(${aestheticGreenRGB},0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: `0 8px 24px rgba(${aestheticGreenRGB},0.25)`,
                color: aestheticGreen,
              }}
            >
              {/* Ikon Register (buku/clipboard/tambah akun) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
              </svg>
            </div>

            <h1
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '20px', // Sedikit lebih kecil dari login agar pas
                fontWeight: '800',
                color: '#ffffff',
                letterSpacing: '0.06em',
                margin: '0',
              }}
            >
              DAFTAR KASIR
            </h1>

            {/* Garis dekoratif */}
            <div
              style={{
                margin: '10px auto 0',
                width: '40px',
                height: '2px',
                borderRadius: '2px',
                background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.7), transparent)`,
              }}
            />
          </div>

          {/* Form */}
          <form autoComplete="off" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Nama Lengkap */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '9px',
                  fontWeight: '700',
                  color: `rgba(${aestheticGreenRGB},0.9)`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Nama Lengkap
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: `rgba(${aestheticGreenRGB},0.5)`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  name="nama_dummy"
                  autoComplete="off"
                  placeholder="Masukkan nama lengkap..."
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = `rgba(${aestheticGreenRGB},0.08)`;
                    e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Username */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '9px',
                  fontWeight: '700',
                  color: `rgba(${aestheticGreenRGB},0.9)`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: `rgba(${aestheticGreenRGB},0.5)`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  name="username_dummy"
                  autoComplete="off"
                  placeholder="Masukkan username..."
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = `rgba(${aestheticGreenRGB},0.08)`;
                    e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '9px',
                  fontWeight: '700',
                  color: `rgba(${aestheticGreenRGB},0.9)`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: `rgba(${aestheticGreenRGB},0.5)`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password_dummy"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = `rgba(${aestheticGreenRGB},0.08)`;
                    e.target.style.borderColor = `rgba(${aestheticGreenRGB},0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${aestheticGreenRGB},0.15)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                    zIndex: 2,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = aestheticGreen}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l-.708-.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* INFO ROLE */}
            <div
              style={{
                background: `rgba(${aestheticGreenRGB},0.1)`,
                border: `1px dashed rgba(${aestheticGreenRGB},0.3)`,
                borderRadius: '10px',
                padding: '8px 12px',
                marginTop: '4px',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s',
              }}
            >
               <p style={{ fontSize: '9px', color: `rgba(${aestheticGreenRGB},0.8)`, margin: 0, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                 Akun didaftarkan otomatis sebagai Role: <strong style={{color: aestheticGreen}}>KASIR</strong>
               </p>
            </div>

            {/* Tombol Register */}
            <div
              style={{
                marginTop: '6px',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.55s ease 0.35s, transform 0.55s ease 0.35s',
              }}
            >
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading
                    ? `rgba(${aestheticGreenRGB},0.3)`
                    : `linear-gradient(135deg, ${aestheticGreen} 0%, ${aestheticGreenDark} 100%)`,
                  color: loading ? 'rgba(255,255,255,0.4)' : '#022c16',
                  fontSize: '13px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : `0 6px 20px rgba(${aestheticGreenRGB},0.4)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(${aestheticGreenRGB},0.5)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = loading ? 'none' : `0 6px 20px rgba(${aestheticGreenRGB},0.4)`;
                }}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                    <span>MEMPROSES...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                    </svg>
                    <span>DAFTAR SEKARANG</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '18px 0 14px',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.55s ease 0.4s',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>ATAU</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Link Balik & Footer */}
          <div
            style={{
              textAlign: 'center',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.55s ease 0.45s',
            }}
          >
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 12px' }}>
              Sudah punya akun?{' '}
              <Link
                to="/"
                style={{
                  color: aestheticGreen,
                  fontWeight: '700',
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(${aestheticGreenRGB},0.4)`,
                  paddingBottom: '2px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.target.style.color = aestheticGreen)}
              >
                Login di sini
              </Link>
            </p>

            <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
              © Toko Listrik Berkah — Blitar Kendalrejo
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::placeholder { color: rgba(255,255,255,0.2) !important; }
        
        /* MENCEGAH AUTONOFILL BROWSER MERUSAK TEMA */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #0e2a1b inset !important;
            -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        /* MENCEGAH ICON MATA BAWAAN BROWSER MUNCUL */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none !important;
        }
        input[type="password"]::-webkit-contacts-auto-fill-button,
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Register;