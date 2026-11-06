import React from 'react';

/**
 * Komponen Modal Sukses Registrasi dengan Rincian Data Pengguna
 */
const SuccessModal = ({ isOpen, userData, onClose }) => {
  if (!isOpen || !userData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Success Icon Badge */}
        <div className="modal-icon-wrapper">
          <div className="modal-icon-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h3 className="modal-title">Registrasi Berhasil!</h3>
        <p className="modal-subtitle">
          Selamat, akun Anda telah berhasil didaftarkan ke dalam sistem. Berikut rincian data akun Anda:
        </p>

        {/* Data Summary Card */}
        <div className="modal-summary-box">
          <div className="summary-row">
            <span className="summary-label">Nama Lengkap</span>
            <span className="summary-value">{userData.fullName}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Username</span>
            <span className="summary-value font-mono">@{userData.username}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Alamat Email</span>
            <span className="summary-value">{userData.email}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Waktu Pendaftaran</span>
            <span className="summary-value font-mono">{userData.registeredAt}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-modal-primary" onClick={onClose}>
            Daftarkan Akun Baru Lainnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
