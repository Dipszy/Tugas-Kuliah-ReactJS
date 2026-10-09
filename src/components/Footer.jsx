import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 pb-4 border-bottom border-secondary">
          {/* Col 1: Brand & Bio */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <span className="p-2 bg-primary text-white rounded-3 me-2 d-inline-flex align-items-center justify-content-center">
                <i className="bi bi-book-half fs-4"></i>
              </span>
              <h4 className="fw-bold mb-0 text-white">Book<span className="text-primary">Store</span></h4>
            </div>
            <p className="text-white-50 small mb-3">
              Platform toko buku online modern yang menghadirkan ribuan pilihan buku berkualitas, 
              original, dan terjangkau untuk meningkatkan literasi di seluruh penjuru Indonesia.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="social-icon-btn bg-secondary bg-opacity-25 text-white" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon-btn bg-secondary bg-opacity-25 text-white" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon-btn bg-secondary bg-opacity-25 text-white" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-icon-btn bg-secondary bg-opacity-25 text-white" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links using React Router Link */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-uppercase mb-3 text-white">Halaman Utama</h6>
            <ul className="list-unstyled small text-white-50 mb-0">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small text-primary"></i> Beranda / Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/book" 
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small text-primary"></i> Katalog Buku / Book
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/team" 
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small text-primary"></i> Tim Kami / Team
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/contact" 
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small text-primary"></i> Kontak / Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-uppercase mb-3 text-white">Kategori Buku</h6>
            <ul className="list-unstyled small text-white-50 mb-0">
              <li className="mb-2"><span className="text-white-50">Fiksi & Sastra</span></li>
              <li className="mb-2"><span className="text-white-50">Teknologi & IT</span></li>
              <li className="mb-2"><span className="text-white-50">Pengembangan Diri</span></li>
              <li className="mb-2"><span className="text-white-50">Bisnis & Finansial</span></li>
              <li className="mb-2"><span className="text-white-50">Komik & Manga</span></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3 text-white">Berlangganan Promo</h6>
            <p className="text-white-50 small mb-3">
              Dapatkan info promo spesial, voucher belanja, dan rilisan buku baru mingguan langsung di inbox email Anda.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Terima kasih telah berlangganan newsletter BookStore!'); }}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control rounded-start-pill bg-dark text-white border-secondary small" 
                  placeholder="Masukkan email Anda..." 
                  required
                />
                <button className="btn btn-primary rounded-end-pill px-4" type="submit">
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <div>
            &copy; {new Date().getFullYear()} BookStore. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="mt-2 mt-md-0">
            Dibuat dengan <i className="bi bi-heart-fill text-danger mx-1"></i> menggunakan React Router & Bootstrap 5
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
