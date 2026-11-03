import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function AdminDashboard() {
  const { genres, authors } = useOutletContext();

  const totalGenreBooks = genres.reduce((acc, curr) => acc + (curr.bookCount || 0), 0);
  const totalAuthorBooks = authors.reduce((acc, curr) => acc + (curr.booksCount || 0), 0);

  return (
    <div className="admin-dashboard">
      {/* Header Banner */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
              <i className="bi bi-shield-check me-1"></i> Admin Panel v2.0
            </span>
            <h2 className="fw-bold mb-1 text-dark">Selamat Datang di Portal Admin</h2>
            <p className="text-muted mb-0">
              Kelola master data genre dan profil author (penulis) buku secara terpadu.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/admin/genres" className="btn btn-primary rounded-pill px-3">
              <i className="bi bi-tags me-1"></i> Kelola Genre
            </Link>
            <Link to="/admin/authors" className="btn btn-outline-primary rounded-pill px-3">
              <i className="bi bi-people me-1"></i> Kelola Author
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-bold text-uppercase">Total Genre</span>
              <div className="icon-box bg-primary bg-opacity-10 text-primary">
                <i className="bi bi-tags-fill fs-4"></i>
              </div>
            </div>
            <h2 className="fw-bold text-dark mb-1">{genres.length}</h2>
            <small className="text-muted">Kategori buku terdaftar</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-bold text-uppercase">Total Author</span>
              <div className="icon-box bg-success bg-opacity-10 text-success">
                <i className="bi bi-people-fill fs-4"></i>
              </div>
            </div>
            <h2 className="fw-bold text-dark mb-1">{authors.length}</h2>
            <small className="text-muted">Penulis aktif terdaftar</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-bold text-uppercase">Estimasi Buku Genre</span>
              <div className="icon-box bg-warning bg-opacity-10 text-warning">
                <i className="bi bi-collection-fill fs-4"></i>
              </div>
            </div>
            <h2 className="fw-bold text-dark mb-1">{totalGenreBooks}</h2>
            <small className="text-muted">Judul buku terklasifikasi</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-muted small fw-bold text-uppercase">Karya Penulis</span>
              <div className="icon-box bg-info bg-opacity-10 text-info">
                <i className="bi bi-book-half fs-4"></i>
              </div>
            </div>
            <h2 className="fw-bold text-dark mb-1">{totalAuthorBooks}</h2>
            <small className="text-muted">Publikasi dari seluruh author</small>
          </div>
        </div>
      </div>

      {/* Quick Preview Tables */}
      <div className="row g-4">
        {/* Genre Preview */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-0 text-dark">Genre Terbaru</h5>
                <small className="text-muted">Daftar genre buku yang baru ditambahkan</small>
              </div>
              <Link to="/admin/genres" className="btn btn-sm btn-outline-primary rounded-pill">
                Lihat Semua
              </Link>
            </div>
            <div className="card-body p-4 pt-2">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0">Nama Genre</th>
                      <th className="border-0">Slug</th>
                      <th className="border-0 text-end">Jumlah Buku</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genres.slice(0, 4).map((g) => (
                      <tr key={g.id}>
                        <td className="fw-semibold text-dark">
                          <i className={`bi bi-tag-fill text-${g.color || 'primary'} me-2`}></i>
                          {g.name}
                        </td>
                        <td>
                          <code className="small text-muted">{g.slug}</code>
                        </td>
                        <td className="text-end">
                          <span className="badge bg-primary-subtle text-primary rounded-pill px-3">
                            {g.bookCount || 0} buku
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Author Preview */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-0 text-dark">Author Terbaru</h5>
                <small className="text-muted">Daftar penulis buku yang baru terdaftar</small>
              </div>
              <Link to="/admin/authors" className="btn btn-sm btn-outline-primary rounded-pill">
                Lihat Semua
              </Link>
            </div>
            <div className="card-body p-4 pt-2">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0">Penulis</th>
                      <th className="border-0">Spesialisasi</th>
                      <th className="border-0 text-end">Karya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.slice(0, 4).map((a) => (
                      <tr key={a.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={a.avatar}
                              alt={a.name}
                              className="rounded-circle"
                              style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                            />
                            <div>
                              <div className="fw-semibold text-dark small">{a.name}</div>
                              <div className="text-muted" style={{ fontSize: '11px' }}>{a.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="small text-muted">{a.specialty}</td>
                        <td className="text-end">
                          <span className="badge bg-success-subtle text-success rounded-pill px-3">
                            {a.booksCount || 0} buku
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
