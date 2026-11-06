/**
 * Helper fungsi untuk validasi form registrasi pengguna
 */

export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return 'Nama lengkap wajib diisi';
  }
  if (name.trim().length < 3) {
    return 'Nama lengkap minimal 3 karakter';
  }
  if (!/^[a-zA-Z\s'.]+$/.test(name)) {
    return 'Nama hanya boleh memuat huruf dan spasi';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Alamat email wajib diisi';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Format email tidak valid (contoh: user@mail.com)';
  }
  return '';
};

export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return 'Username wajib diisi';
  }
  if (username.length < 4) {
    return 'Username minimal 4 karakter';
  }
  if (username.length > 20) {
    return 'Username maksimal 20 karakter';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username hanya boleh memuat huruf, angka, dan underscore (_)';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password wajib diisi';
  }
  if (password.length < 8) {
    return 'Password minimal 8 karakter';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return 'Password harus memuat kombinasi huruf besar & kecil';
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password harus memuat setidaknya 1 angka';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Konfirmasi password wajib diisi';
  }
  if (password !== confirmPassword) {
    return 'Konfirmasi password tidak cocok dengan password';
  }
  return '';
};

export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Kosong', color: '#94a3b8' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score: 1, label: 'Lemah', color: '#ef4444', percent: '33%' };
  } else if (score <= 4) {
    return { score: 2, label: 'Sedang', color: '#f59e0b', percent: '66%' };
  } else {
    return { score: 3, label: 'Kuat', color: '#10b981', percent: '100%' };
  }
};
