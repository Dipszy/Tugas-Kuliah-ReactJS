import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout, switchAccount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page py-5 bg-light flex-grow-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            {/* User Profile Card */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5 mb-4">
              <div className="d-flex flex-column flex-sm-row align-items-center gap-4 pb-4 border-bottom">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="rounded-circle shadow-sm"
                  style={{ width: '96px', height: '96px', objectFit: 'cover' }}
                />
                <div className="text-center text-sm-start flex-grow-1">
                  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                    <h3 className="fw-bold text-dark mb-0">{user?.name}</h3>
                    <span className={`badge rounded-pill px-3 py-1 ${user?.role === 'admin' ? 'bg-primary' : 'bg-success'}`}>
                      {user?.role === 'admin' ? 'Administrator' : 'Pengguna Biasa (User)'}
                    </span>
                  </div>
                  <div className="text-muted small mb-2">
                    <i className="bi bi-envelope me-1"></i> {user?.email}
                  </div>
                  <p className="text-muted small mb-0">{user?.bio}</p>
                </div>
              </div>

              {/* Account Role & Access Details */}
              <div className="py-4 border-bottom">
                <h5 className="fw-bold text-dark mb-3">Hak Akses & Otorisasi Pengguna</h5>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="small text-muted mb-1">Peran Pengguna (Role)</div>
                      <div className="fw-bold text-dark text-uppercase">{user?.role}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="small text-muted mb-1">Status Panel Admin</div>
                      <div className={`fw-bold ${user?.role === 'admin' ? 'text-success' : 'text-danger'}`}>
                        {user?.role === 'admin' ? (
                          <span><i className="bi bi-check-circle-fill me-1"></i> Diizinkan Penuh</span>
                        ) : (
                          <span><i className="bi bi-x-circle-fill me-1"></i> Terbatas (No Access)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="btn btn-primary rounded-pill px-4 shadow-sm">
                      <i className="bi bi-shield-lock-fill me-1"></i> Buka Panel Admin
                    </Link>
                  )}
                  <Link to="/book" className="btn btn-outline-secondary rounded-pill px-4">
                    <i className="bi bi-journal-bookmark me-1"></i> Jelajah Buku
                  </Link>
                </div>

                <button 
                  type="button" 
                  className="btn btn-outline-danger rounded-pill px-4"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Keluar (Logout)
                </button>
              </div>
            </div>

            {/* Quick Switch Card for Lecturer/Mentor Testing */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="fw-bold text-dark mb-0">
                  <i className="bi bi-arrow-repeat text-primary me-2"></i> Simulasi Switch Role (Pengujian Mentor)
                </h6>
                <span className="badge bg-secondary-subtle text-secondary small">Demo Tools</span>
              </div>
              <p className="text-muted small mb-3">
                Ganti peran akun secara langsung untuk menguji proteksi rute halaman admin:
              </p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 flex-fill ${user?.role === 'user' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => switchAccount('user')}
                >
                  <i className="bi bi-person me-1"></i> Aktifkan Akun User Biasa
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 flex-fill ${user?.role === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => switchAccount('admin')}
                >
                  <i className="bi bi-shield-lock me-1"></i> Aktifkan Akun Admin
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
