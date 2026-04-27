import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import bgKasir from '../assets/bg-kasir.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const showToast = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      const role = response.data.user.role;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('namaUser', response.data.user.nama);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/transaction');
      }
    } catch (err) {
      showToast('Login gagal: ' + (err.response?.data?.message || 'Server error'));
    } finally {
      setLoading(false);
    }
  };

  // Warna aesthetic green yang digunakan berulang
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
        overflow: 'hidden',
      }}
    >
      {/* Overlay dengan tone hijau gelap yang soft */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 24, 16, 0.78)', 
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
      />

      {/* Dekorasi blur hijau aesthetic (lebih cerah dan menyebar) */}
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
        {/* Card Login */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            background: 'rgba(12, 36, 24, 0.75)',
            border: `1px solid rgba(${aestheticGreenRGB},0.2)`,
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderRadius: '24px',
            padding: '36px 32px 28px 32px',
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
              marginBottom: '28px',
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
                margin: '0 auto 16px',
                boxShadow: `0 8px 24px rgba(${aestheticGreenRGB},0.25)`,
                color: aestheticGreen,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
              </svg>
            </div>

            <h1
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '22px',
                fontWeight: '800',
                color: '#ffffff',
                letterSpacing: '0.06em',
                margin: '0',
              }}
            >
              BERKAH LISTRIK
            </h1>

            {/* Garis dekoratif */}
            <div
              style={{
                margin: '14px auto 0',
                width: '40px',
                height: '2px',
                borderRadius: '2px',
                background: `linear-gradient(90deg, transparent, rgba(${aestheticGreenRGB},0.7), transparent)`,
              }}
            />
          </div>

          {/* Form */}
          {/* AUTOFILL FIX 1: Tambahkan autoComplete="off" pada form */}
          <form autoComplete="off" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Username */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.55s ease 0.18s, transform 0.55s ease 0.18s',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: `rgba(${aestheticGreenRGB},0.9)`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  </svg>
                </span>
                {/* AUTOFILL FIX 2: name dummy dan autoComplete off */}
                <input
                  type="text"
                  name="username_dummy"
                  autoComplete="off"
                  placeholder="Masukkan username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px 16px 13px 44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '13px',
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
                transition: 'opacity 0.55s ease 0.26s, transform 0.55s ease 0.26s',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: `rgba(${aestheticGreenRGB},0.9)`,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
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
                {/* AUTOFILL FIX 3: name dummy dan autoComplete new-password */}
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password_dummy"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px 44px 13px 44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '13px',
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
                  onClick={() => setShowPass(!showPass)}
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
                  {showPass ? (
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

            {/* Tombol Login */}
            <div
              style={{
                marginTop: '6px',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.55s ease 0.34s, transform 0.55s ease 0.34s',
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
                      <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/>
                    </svg>
                    <span>MASUK SEKARANG</span>
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
              margin: '20px 0 16px',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.55s ease 0.42s',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>ATAU</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Daftar Akun & Footer */}
          <div
            style={{
              textAlign: 'center',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.55s ease 0.46s',
            }}
          >
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 16px' }}>
              Belum punya akun?{' '}
              <Link
                to="/register"
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
                Daftar Akun
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
        
        /* AUTOFILL FIX 4: MENCEGAH AUTONOFILL BROWSER MERUSAK TEMA */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #0c2418 inset !important;
            -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        /* HIDE NATIVE BROWSER PASSWORD REVEAL ICON */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none !important;
        }
        
        /* Untuk webkit browser (chrome/safari) jika diperlukan */
        input[type="password"]::-webkit-contacts-auto-fill-button,
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Login;