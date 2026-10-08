import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Action buttons */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <button className="btn btn-light position-relative rounded-pill px-3 py-2 border">
              <i className="bi bi-cart3 me-1"></i> Keranjang
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <button 
              type="button" 
              className="btn btn-outline-primary rounded-pill px-3 py-2"
              onClick={() => alert('Fitur Login - Silakan masukkan akun Anda!')}
            >
              Login
            </button>
            <button 
              type="button" 
              className="btn btn-primary rounded-pill px-3 py-2"
              onClick={() => alert('Fitur Register - Pendaftaran Akun Baru!')}
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
