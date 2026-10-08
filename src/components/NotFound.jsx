import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-5 text-center my-auto">
      <div className="py-5">
        <div className="display-1 fw-bold text-primary mb-3">404</div>
        <h2 className="fw-bold mb-3">Halaman Tidak Ditemukan</h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: '480px' }}>
          Maaf, halaman yang Anda cari tidak tersedia atau tautan mungkin telah dipindahkan.
        </p>
        <Link to="/" className="btn btn-primary rounded-pill px-4 py-2 shadow-sm">
          <i className="bi bi-house-door-fill me-2"></i> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
