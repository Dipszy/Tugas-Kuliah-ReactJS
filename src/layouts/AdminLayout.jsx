import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import initialGenres from '../utils/genres';
import initialAuthors from '../utils/authors';

function AdminLayout() {
  const [genres, setGenres] = useState(initialGenres);
  const [authors, setAuthors] = useState(initialAuthors);

  // Create handlers
  const addGenre = (newGenre) => {
    setGenres((prev) => [newGenre, ...prev]);
  };

  const addAuthor = (newAuthor) => {
    setAuthors((prev) => [newAuthor, ...prev]);
  };

  return (
    <div className="admin-wrapper bg-light min-vh-100 d-flex flex-column">
      {/* Top Admin Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 px-3 shadow-sm sticky-top">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand d-flex align-items-center fw-bold gap-2">
            <span className="p-1 px-2 bg-primary rounded-2 fs-6">
              <i className="bi bi-shield-lock-fill"></i>
            </span>
            <span>BookStore <span className="text-primary">Admin</span></span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="btn btn-outline-light btn-sm rounded-pill px-3">
              <i className="bi bi-box-arrow-left me-1"></i> Ke Toko Utama
            </Link>
            <div className="d-flex align-items-center gap-2 text-white ps-2 border-start border-secondary">
              <span className="badge bg-success rounded-circle p-1"> </span>
              <span className="small fw-semibold d-none d-sm-inline">Administrator</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container with Sidebar + Content */}
      <div className="container-fluid flex-grow-1 py-4">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-md-3 col-xl-2">
            <div className="card border-0 shadow-sm rounded-4 sticky-md-top" style={{ top: '80px' }}>
              <div className="card-body p-3">
                <div className="text-muted text-uppercase small fw-bold px-3 mb-2" style={{ letterSpacing: '0.05em' }}>
                  Menu Manajemen
                </div>
                <div className="nav flex-column nav-pills gap-1">
                  <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center gap-2 rounded-3 py-2 px-3 fw-medium ${
                        isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-light'
                      }`
                    }
                  >
                    <i className="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                  </NavLink>

                  <NavLink
                    to="/admin/genres"
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center justify-content-between rounded-3 py-2 px-3 fw-medium ${
                        isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-light'
                      }`
                    }
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-tags-fill"></i>
                      <span>Genre Buku</span>
                    </span>
                    <span className="badge rounded-pill bg-light text-dark small">{genres.length}</span>
                  </NavLink>

                  <NavLink
                    to="/admin/authors"
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center justify-content-between rounded-3 py-2 px-3 fw-medium ${
                        isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-light'
                      }`
                    }
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className="bi bi-people-fill"></i>
                      <span>Author / Penulis</span>
                    </span>
                    <span className="badge rounded-pill bg-light text-dark small">{authors.length}</span>
                  </NavLink>
                </div>

                <hr className="my-3 text-muted" />

                <div className="text-muted text-uppercase small fw-bold px-3 mb-2" style={{ letterSpacing: '0.05em' }}>
                  Akses Cepat
                </div>
                <div className="nav flex-column gap-1">
                  <Link to="/book" className="nav-link text-muted small py-1 px-3 d-flex align-items-center gap-2">
                    <i className="bi bi-journal-bookmark"></i> Katalog Buku
                  </Link>
                  <Link to="/" className="nav-link text-muted small py-1 px-3 d-flex align-items-center gap-2">
                    <i className="bi bi-house-door"></i> Beranda Publik
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="col-12 col-md-9 col-xl-10">
            <Outlet context={{ genres, setGenres, addGenre, authors, setAuthors, addAuthor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
