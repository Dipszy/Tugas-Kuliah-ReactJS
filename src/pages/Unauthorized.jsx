import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Unauthorized() {
  const { user, switchAccount } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const attemptedPath = location.state?.attemptedPath || '/admin';

  const handleSwitchToAdmin = () => {
    switchAccount('admin');
    navigate(attemptedPath, { replace: true });
  };

  return (
    <div className="container py-5 my-auto">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center bg-white">
            <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex mx-auto mb-3">
              <i className="bi bi-shield-slash-fill fs-1"></i>
            </div>

            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fw-semibold align-self-center mb-2">
              HTTP 403: Forbidden Access
            </span>

            <h2 className="fw-bold text-dark mb-2">Akses Ditolak!</h2>
            <p className="text-muted small mb-4">
              Halaman <code className="text-danger fw-semibold">{attemptedPath}</code> memiliki pembatasan hak akses dan 
              <strong> hanya dapat dibuka oleh Administrator</strong>. Akun Anda saat ini memiliki peran{' '}
              <span className="badge bg-secondary text-uppercase">{user?.role || 'Guest'}</span>.
            </p>

            {/* Current user info */}
            {user && (
              <div className="p-3 bg-light rounded-3 text-start d-flex align-items-center gap-3 mb-4 border">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1 overflow-hidden">
                  <div className="fw-bold text-dark small text-truncate">{user.name}</div>
                  <div className="text-muted small text-truncate">{user.email}</div>
                  <span className="badge bg-warning text-dark small mt-1">Role: {user.role}</span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
              <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                <i className="bi bi-house-door me-1"></i> Kembali ke Beranda
              </Link>
              <button 
                type="button" 
                className="btn btn-primary rounded-pill px-4 shadow-sm"
                onClick={handleSwitchToAdmin}
              >
                <i className="bi bi-shield-lock-fill me-1"></i> Masuk Sebagai Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
