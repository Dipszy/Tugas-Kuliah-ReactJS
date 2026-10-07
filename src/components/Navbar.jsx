import React, { useState } from 'react';

function Navbar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3 shadow-sm">
      <div className="container">
        {/* Brand */}
        <a 
          href="#home" 
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark"
          onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
        >
          <span className="p-2 bg-primary bg-opacity-10 text-primary rounded-3 me-2 d-inline-flex align-items-center justify-content-center">
            <i className="bi bi-book-half fs-4"></i>
          </span>
          <span>Book<span className="text-primary">Store</span></span>
        </a>

        {/* Toggler button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links & CTA */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item">
              <a 
                href="#home" 
                className={`nav-link px-3 ${activePage === 'home' ? 'active-tab' : 'text-secondary'}`}
                onClick={(e) => { e.preventDefault(); setActivePage('home'); setIsOpen(false); }}
              >
                <i className="bi bi-house-door me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#team" 
                className={`nav-link px-3 ${activePage === 'team' ? 'active-tab' : 'text-secondary'}`}
                onClick={(e) => { e.preventDefault(); setActivePage('team'); setIsOpen(false); }}
              >
                <i className="bi bi-people me-1"></i> Team
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#contact" 
                className={`nav-link px-3 ${activePage === 'contact' ? 'active-tab' : 'text-secondary'}`}
                onClick={(e) => { e.preventDefault(); setActivePage('contact'); setIsOpen(false); }}
              >
                <i className="bi bi-envelope me-1"></i> Contact
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
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
