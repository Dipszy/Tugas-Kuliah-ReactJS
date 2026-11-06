import React, { useState } from 'react';
import InputGroup from './InputGroup';
import PasswordStrengthBar from './PasswordStrengthBar';
import SuccessModal from './SuccessModal';
import {
  validateFullName,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation';

/**
 * Komponen Form Registrasi Utama
 */
const RegisterForm = () => {
  // 1. State form input
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // 2. State error & interaksi user (touched)
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper validasi per-field
  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case 'fullName':
        return validateFullName(value);
      case 'email':
        return validateEmail(value);
      case 'username':
        return validateUsername(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(allValues.password, value);
      case 'agreeTerms':
        return value ? '' : 'Anda harus menyetujui Syarat & Ketentuan';
      default:
        return '';
    }
  };

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: fieldValue,
    };

    setFormData(updatedFormData);

    // Jalankan validasi real-time jika field sudah pernah di-touch
    if (touched[name]) {
      const fieldError = validateField(name, fieldValue, updatedFormData);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }

    // Jika password diubah, cek ulang validitas konfirmasi password jika sudah disentuh
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateConfirmPassword(fieldValue, formData.confirmPassword);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  // Handler saat input kehilangan fokus (onBlur)
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, fieldValue, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // Handler Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi seluruh input
    const validationErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      agreeTerms: formData.agreeTerms ? '' : 'Anda harus menyetujui Syarat & Ketentuan',
    };

    // Tandai seluruh field telah disentuh
    setTouched({
      fullName: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    });

    setErrors(validationErrors);

    // Cek apakah ada error
    const hasAnyError = Object.values(validationErrors).some((msg) => msg !== '');

    if (!hasAnyError) {
      setIsSubmitting(true);

      // Simulasi pengiriman data asinkron (misal ke REST API backend)
      setTimeout(() => {
        setIsSubmitting(false);
        const registeredData = {
          fullName: formData.fullName.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
          registeredAt: new Date().toLocaleString('id-ID', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }),
        };

        setRegisteredUser(registeredData);
        setIsModalOpen(true);
      }, 1000);
    }
  };

  // Reset form setelah modal ditutup
  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    });
    setErrors({});
    setTouched({});
    setIsModalOpen(false);
    setRegisteredUser(null);
  };

  return (
    <div className="register-card">
      <div className="card-header-section">
        <div className="brand-badge">
          <span className="brand-dot"></span> React JS Lanjutan
        </div>
        <h2 className="card-title">Buat Akun Baru</h2>
        <p className="card-subtitle">
          Silakan lengkapi formulir pendaftaran di bawah ini untuk memulai akses.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="form-content">
        {/* Field 1: Nama Lengkap */}
        <InputGroup
          id="fullName"
          name="fullName"
          label="Nama Lengkap"
          placeholder="Contoh: Muhamad Iqbal"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          touched={touched.fullName}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        {/* Field 2: Username */}
        <InputGroup
          id="username"
          name="username"
          label="Username"
          placeholder="Contoh: iqbal_dev"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          touched={touched.username}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
            </svg>
          }
        />

        {/* Field 3: Email */}
        <InputGroup
          id="email"
          name="email"
          type="email"
          label="Alamat Email"
          placeholder="Contoh: iqbal@mail.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        {/* Field 4: Password */}
        <InputGroup
          id="password"
          name="password"
          type="password"
          label="Kata Sandi (Password)"
          placeholder="Minimal 8 karakter kombinasi"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
        />

        {/* Password Strength Indicator */}
        <PasswordStrengthBar password={formData.password} />

        {/* Field 5: Konfirmasi Password */}
        <InputGroup
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi Anda"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />

        {/* Terms & Conditions Checkbox */}
        <div className="terms-checkbox-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className="custom-checkbox"
            />
            <span className="checkbox-text">
              Saya menyetujui <span className="terms-link">Syarat & Ketentuan Layanan</span> serta Kebijakan Privasi yang berlaku.
            </span>
          </label>
          {touched.agreeTerms && errors.agreeTerms && (
            <p className="input-error-msg terms-error">
              <span>{errors.agreeTerms}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="btn-loading-state">
              <svg className="spinner-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Memproses Pendaftaran...
            </span>
          ) : (
            <span className="btn-content">
              Daftar Sekarang
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          )}
        </button>

        <p className="footer-login-text">
          Sudah memiliki akun terdaftar? <span className="login-link">Masuk di sini</span>
        </p>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        userData={registeredUser}
        onClose={handleResetForm}
      />
    </div>
  );
};

export default RegisterForm;
