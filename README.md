# BookStore Web App - Tugas Kuliah React JS

Repository ini berisi serangkaian tugas mata kuliah **React JS** & **React JS Lanjutan** oleh:
- **Nama:** Muhamad Iqbal
- **Institusi:** STT Terpadu Nurul Fikri
- **Branch:** `React-Lanjutan-3`

---

## 📌 Tugas React JS Lanjutan #3 – Fitur Registrasi Pengguna

Implementasi fitur pendaftaran akun pengguna baru (*User Registration*) yang modern, responsif, dan terintegrasi ke dalam ekosistem aplikasi BookStore.

### 🌟 Fitur Utama
1. **Form Registrasi Komprehensif:**
   - Field `Nama Lengkap` (validasi minimal 3 karakter, alfabet dan spasi)
   - Field `Username` (validasi minimal 4 karakter, alfanumerik & underscore)
   - Field `Alamat Email` (validasi format email sesuai standar RFC)
   - Field `Kata Sandi (Password)` & `Konfirmasi Password`
   - Checkbox persetujuan `Syarat & Ketentuan Layanan`
2. **Password Strength Meter Dinamis:**
   - Indikator real-time tingkat keamanan kata sandi: *Lemah*, *Sedang*, *Kuat*.
   - Evaluasi berdasarkan panjang karakter, variasi huruf kapital, huruf kecil, dan angka.
3. **Validasi Interaktif & Realtime:**
   - Peringatan error muncul otomatis saat input kehilangan fokus (`onBlur`).
   - Peringatan otomatis hilang saat pengguna mulai mengetik perbaikan (`onChange`).
   - Validasi menyeluruh saat form disubmit (`onSubmit`).
4. **Keamanan & Fitur Intip Password:**
   - Tombol toggle show/hide kata sandi dengan ikon interaktif.
5. **Modal Popup Ringkasan:**
   - Konfirmasi visual pendaftaran berhasil dengan rincian data (Nama, Username, Email, Waktu pendaftaran).
6. **Integrasi Navigasi:**
   - Tombol **Daftar** pada Navbar publik otomatis mengarahkan ke halaman registrasi (`/register`).

---

## 📁 Struktur Komponen
```text
src/
├── components/
│   ├── InputGroup.jsx           # Reusable input component dengan validasi & icon
│   ├── PasswordStrengthBar.jsx  # Indikator visual kekuatan password
│   ├── RegisterForm.jsx         # Form registrasi dengan validasi interaktif
│   ├── SuccessModal.jsx         # Modal dialog pendaftaran berhasil
│   ├── Navbar.jsx               # Navigasi publik dengan link ke /register
│   └── ...
├── pages/
│   ├── Register.jsx             # Halaman registrasi dengan showcase banner
│   └── ...
├── utils/
│   └── validation.js            # Helper pure functions untuk validasi form
├── register.css                 # Styling responsif registrasi
├── App.jsx                      # Definisi declarative routing React Router
└── index.css
```

---

## 🚀 Cara Menjalankan Proyek di Lokal
1. **Clone repository:**
   ```bash
   git clone https://github.com/Dipszy/Tugas-Kuliah-ReactJS.git
   cd Tugas-Kuliah-ReactJS
   ```
2. **Pindah ke branch `React-Lanjutan-3`:**
   ```bash
   git checkout React-Lanjutan-3
   ```
3. **Instal dependensi:**
   ```bash
   npm install
   ```
4. **Jalankan development server:**
   ```bash
   npm run dev
   ```
5. Buka tautan lokal yang tampil di terminal (biasanya `http://localhost:5173/` atau `http://localhost:5173/register`).
