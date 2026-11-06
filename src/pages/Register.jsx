import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register-page-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container py-4 py-lg-5 position-relative" style={{ zIndex: 1 }}>
        {/* Navigation Breadcrumb / Quick Back */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link to="/" className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-2">
            <i className="bi bi-arrow-left"></i> Kembali ke Beranda
          </Link>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace small">
            Tugas 3 React JS Lanjutan
          </span>
        </div>

        <div className="row g-4 align-items-stretch justify-content-center">
          {/* Left Column: Showcase & Info */}
          <div className="col-lg-5 d-flex flex-column justify-content-between">
            <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-primary bg-opacity-10 text-primary fw-semibold small mb-3">
                  <i className="bi bi-shield-check"></i>
                  <span>Sistem Registrasi Terproteksi</span>
                </div>

                <h1 className="fw-bold text-dark display-6 mb-3">
                  Bergabung Bersama <span className="text-primary">BookStore</span>
                </h1>
                <p className="text-muted leading-relaxed mb-4">
                  Daftarkan akun Anda untuk menikmati akses lengkap katalog ribuan koleksi buku, fitur simpan keranjang belanja, serta pantau pembaruan genre dan karya penulis favorit Anda.
                </p>

                {/* Feature highlights */}
                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                      <i className="bi bi-check2-circle fs-5"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Validasi Form Interaktif</h6>
                      <small className="text-muted">Pemeriksaan format email RFC, panjang karakter, serta kelengkapan field secara instan.</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                      <i className="bi bi-shield-lock fs-5"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Password Strength Meter</h6>
                      <small className="text-muted">Pengukur tingkat keamanan kata sandi real-time dengan indikator visual dinamis.</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-info bg-opacity-10 text-info rounded-3 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                      <i className="bi bi-layers fs-5"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Arsitektur Komponen Modular</h6>
                      <small className="text-muted">Dibangun menggunakan reusable input group, custom modal, dan prinsip separation of concerns.</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student identity card */}
              <div className="pt-3 border-top mt-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-circle bg-primary text-white fw-bold rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 44, height: 44 }}>
                    MI
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">Muhamad Iqbal</h6>
                    <small className="text-muted">STT Terpadu Nurul Fikri &bull; Frontend Engineer</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="col-lg-7">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
