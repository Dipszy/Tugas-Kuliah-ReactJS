import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3 shadow-sm">
      <div className="container">
        {/* Brand Link using React Router Link */}
        <Link 
          to="/" 
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark"
          onClick={() => setIsOpen(false)}
        >
          <span className="p-2 bg-primary bg-opacity-10 text-primary rounded-3 me-2 d-inline-flex align-items-center justify-content-center">
            <i className="bi bi-book-half fs-4"></i>
          </span>
          <span>Book<span className="text-primary">Store</span></span>
        </Link>

        {/* Toggler button for responsive mobile view */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links using React Router NavLink with enhanced active styling */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-house-door me-2"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/book" 
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-journal-bookmark me-2"></i> Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/team" 
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-people me-2"></i> Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-envelope me-2"></i> Contact
              </NavLink>
            </li>
          </ul>

          {/* Action buttons with Role-Based State */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Tombol Panel Admin HANYA muncul jika pengguna memiliki role admin */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="btn btn-outline-dark rounded-pill px-3 py-2 d-flex align-items-center gap-1 shadow-sm"
                title="Masuk ke Panel Admin"
              >
                <i className="bi bi-shield-lock-fill text-primary"></i>
                <span className="fw-semibold small">Panel Admin</span>
              </Link>
            )}

            <button className="btn btn-light position-relative rounded-pill px-3 py-2 border">
              <i className="bi bi-cart3 me-1"></i> Keranjang
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>

            {/* Kondisi Login: Jika sudah login tampilkan Profil & Logout, jika belum tampilkan Login & Register */}
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/profile" 
                  className="btn btn-light rounded-pill px-3 py-2 border d-flex align-items-center gap-2"
                  title="Lihat Profil Saya"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle"
                    style={{ width: '22px', height: '22px', objectFit: 'cover' }}
                  />
                  <span className="small fw-semibold text-dark">{user.name.split(' ')[0]}</span>
                  <span className={`badge rounded-pill small ${isAdmin ? 'bg-primary' : 'bg-success'}`} style={{ fontSize: '10px' }}>
                    {user.role}
                  </span>
                </Link>

                <button 
                  type="button" 
                  className="btn btn-outline-danger btn-sm rounded-circle p-2"
                  onClick={handleLogout}
                  title="Keluar (Logout)"
                  style={{ width: '38px', height: '38px' }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline-primary rounded-pill px-3 py-2"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary rounded-pill px-3 py-2"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
