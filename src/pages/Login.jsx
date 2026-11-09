import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';

function Login() {
  const { login, switchAccount, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Target destination after login (default to profile or admin if admin)
  const from = location.state?.from?.pathname || (user?.role === 'admin' ? '/admin' : '/profile');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(email, password);
    if (res.success) {
      const destination = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : '/profile');
      navigate(destination, { replace: true });
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickLogin = (role) => {
    const logged = switchAccount(role);
    const destination = location.state?.from?.pathname || (logged.role === 'admin' ? '/admin' : '/profile');
    navigate(destination, { replace: true });
  };

  return (
    <div className="login-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex mb-2">
                  <i className="bi bi-person-lock fs-2"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">Masuk ke BookStore</h3>
                <p className="text-muted small">
                  Silakan masuk untuk mengakses fitur toko atau panel administrator.
                </p>
              </div>

              {location.state?.from && (
                <div className="alert alert-warning border-0 small rounded-3 mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle-fill"></i>
                  <span>Silakan login terlebih dahulu untuk mengakses halaman tujuan Anda.</span>
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger border-0 small rounded-3 mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Alamat Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      placeholder="nama@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Kata Sandi</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><i className="bi bi-key"></i></span>
                    <input
                      type="password"
                      className="form-control bg-light border-0"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-sm fw-semibold mb-3">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Masuk Sekarang
                </button>
              </form>

              {/* Quick Login Helper Box */}
              <div className="pt-3 border-top text-center">
                <div className="text-muted small fw-semibold text-uppercase mb-2" style={{ fontSize: '11px' }}>
                  Akses Cepat Pengujian (Role-Based Demo)
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm rounded-pill py-2 d-flex align-items-center justify-content-between px-3"
                    onClick={() => handleQuickLogin('admin')}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-shield-lock-fill text-primary"></i>
                      <span className="fw-semibold">Login sebagai Administrator</span>
                    </span>
                    <span className="badge bg-primary rounded-pill">Role: admin</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill py-2 d-flex align-items-center justify-content-between px-3"
                    onClick={() => handleQuickLogin('user')}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-circle text-success"></i>
                      <span className="fw-semibold">Login sebagai Pengguna Biasa</span>
                    </span>
                    <span className="badge bg-success rounded-pill">Role: user</span>
                  </button>
                </div>
              </div>

              <div className="text-center mt-4 text-muted small">
                Belum punya akun? <Link to="/register" className="text-primary fw-semibold text-decoration-none">Daftar Akun Baru</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
