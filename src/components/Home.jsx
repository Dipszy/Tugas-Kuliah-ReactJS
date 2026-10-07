import React, { useState } from 'react';

function Home({ setActivePage }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Fiksi & Sastra', 'Teknologi & Koding', 'Self Improvement', 'Bisnis & Finansial'];

  const books = [
    {
      id: 1,
      title: 'Atomic Habits: Perubahan Kecil Hasil Luar Biasa',
      author: 'James Clear',
      category: 'Self Improvement',
      price: 'Rp 98.000',
      originalPrice: 'Rp 120.000',
      rating: 5.0,
      sold: '1.2k',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Mastering Modern React & TypeScript',
      author: 'Dan Abramov & Tim',
      category: 'Teknologi & Koding',
      price: 'Rp 145.000',
      originalPrice: 'Rp 180.000',
      rating: 4.9,
      sold: '850',
      badge: 'Populer',
      image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Filosofi Teras: Hidup Tenang Tanpa Cemas',
      author: 'Henry Manampiring',
      category: 'Self Improvement',
      price: 'Rp 88.000',
      originalPrice: 'Rp 110.000',
      rating: 4.9,
      sold: '2.5k',
      badge: 'Top Pick',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Bumi Manusia: Tetralogi Buru',
      author: 'Pramoedya Ananta Toer',
      category: 'Fiksi & Sastra',
      price: 'Rp 115.000',
      originalPrice: 'Rp 135.000',
      rating: 5.0,
      sold: '3.1k',
      badge: 'Klasik',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Bisnis & Finansial',
      price: 'Rp 85.000',
      originalPrice: 'Rp 105.000',
      rating: 4.8,
      sold: '1.9k',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Clean Code: Panduan Pengembang Profesional',
      author: 'Robert C. Martin',
      category: 'Teknologi & Koding',
      price: 'Rp 160.000',
      originalPrice: 'Rp 200.000',
      rating: 4.9,
      sold: '720',
      badge: 'Hot Item',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredBooks = selectedCategory === 'Semua' 
    ? books 
    : books.filter(b => b.category === selectedCategory);

  const features = [
    {
      icon: 'bi-patch-check-fill',
      color: 'bg-primary text-white',
      title: '100% Buku Asli',
      desc: 'Langsung dari penerbit resmi nasional dan internasional terpercaya.'
    },
    {
      icon: 'bi-truck',
      color: 'bg-success text-white',
      title: 'Bebas Ongkir',
      desc: 'Gratis ongkir ke seluruh Indonesia dengan minimal belanja Rp 100.000.'
    },
    {
      icon: 'bi-shield-check',
      color: 'bg-warning text-white',
      title: 'Pembayaran Aman',
      desc: 'Mendukung QRIS, transfer bank, e-wallet, dan fitur COD di kota besar.'
    },
    {
      icon: 'bi-headset',
      color: 'bg-info text-white',
      title: 'Layanan 24/7',
      desc: 'Customer support kami siap membantu pertanyaan dan keluhan Anda.'
    }
  ];

  const testimonials = [
    {
      name: 'Rian Pratama',
      role: 'Mahasiswa Informatika',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      comment: 'Buku-buku teknologinya sangat lengkap dan pengiriman sangat cepat. Packing rapi dengan bubble wrap tebal!',
      rating: 5
    },
    {
      name: 'Annisa Rahmawati',
      role: 'Book Reviewer & Blogger',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'Senang banget langganan di BookStore! Kualitas bukunya dijamin original dan sering ada promo diskon menarik.',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'Pecinta Sastra',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      comment: 'Koleksi novel klasik dan terjemahannya selalu update. Customer service-nya juga ramah dan sangat solutif.',
      rating: 5
    }
  ];

  return (
    <div className="home-page pb-5">
      {/* 1. HERO SECTION */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
                <i className="bi bi-stars me-1"></i> Promo Spesial Pekan Ini: Diskon s.d 40%
              </span>
              <h1 className="display-4 fw-bold lh-sm text-dark mb-3">
                Jelajahi Inspirasi Baru Lewat <span className="text-primary">Buku Pilihan</span>
              </h1>
              <p className="lead text-muted mb-4">
                Toko buku terlengkap dengan ribuan koleksi novel, literatur akademik, teknologi, 
                hingga pengembangan diri. Kembangkan potensimu bersama kami setiap hari.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <a href="#katalog" className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm">
                  <i className="bi bi-bag-check me-2"></i> Belanja Sekarang
                </a>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-lg px-4 rounded-pill"
                  onClick={() => setActivePage('team')}
                >
                  <i className="bi bi-people me-2"></i> Kenali Tim Kami
                </button>
              </div>

              {/* Quick stats */}
              <div className="row pt-3 border-top g-3 text-center text-sm-start">
                <div className="col-4">
                  <h4 className="fw-bold mb-0 text-primary">15K+</h4>
                  <small className="text-muted">Koleksi Buku</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold mb-0 text-primary">45K+</h4>
                  <small className="text-muted">Pelanggan Puas</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold mb-0 text-primary">4.9/5</h4>
                  <small className="text-muted">Rating Toko</small>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1507842229451-79b1be88688e?auto=format&fit=crop&w=800&q=80" 
                  alt="Perpustakaan & Toko Buku" 
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ maxHeight: '440px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow-lg ms-3 d-none d-sm-flex align-items-center gap-3 border">
                  <div className="p-3 bg-success bg-opacity-10 text-success rounded-circle">
                    <i className="bi bi-check-circle-fill fs-3"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Garansi 100% Original</h6>
                    <small className="text-muted">Buku Asli Langsung Dari Penerbit</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase small tracking-wide">Mengapa Memilih Kami</span>
            <h2 className="fw-bold mt-1">Keunggulan Berbelanja di BookStore</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Kami berkomitmen menghadirkan pengalaman berbelanja buku yang cepat, nyaman, dan memuaskan.
            </p>
          </div>

          <div className="row g-4">
            {features.map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-3 hover-lift bg-white">
                  <div className="card-body">
                    <div className={`icon-box ${item.color} mb-3`}>
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <h5 className="card-title fw-bold">{item.title}</h5>
                    <p className="card-text text-muted small">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BOOK SHOWCASE / CATALOG */}
      <section className="py-5" id="katalog">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
              <span className="text-primary fw-bold text-uppercase small">Koleksi Terpopuler</span>
              <h2 className="fw-bold mt-1 mb-0">Buku Rekomendasi Pekan Ini</h2>
            </div>
            
            {/* Category Filter Pills */}
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-medium ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          <div className="row g-4">
            {filteredBooks.map((book) => (
              <div className="col-sm-6 col-lg-4" key={book.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift bg-white">
                  <div className="position-relative">
                    <img 
                      src={book.image} 
                      className="card-img-top book-cover" 
                      alt={book.title} 
                    />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-primary rounded-pill px-3 py-2 shadow-sm">
                      {book.badge}
                    </span>
                    <span className="position-absolute bottom-0 end-0 m-3 badge bg-dark bg-opacity-75 rounded-pill px-2 py-1">
                      <i className="bi bi-star-fill text-warning me-1"></i> {book.rating} ({book.sold})
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column p-4">
                    <span className="text-muted small fw-semibold text-uppercase mb-1">{book.category}</span>
                    <h5 className="card-title fw-bold text-dark mb-1">{book.title}</h5>
                    <p className="text-muted small mb-3">Penulis: <span className="fw-semibold text-dark">{book.author}</span></p>

                    <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-danger fw-bold fs-5">{book.price}</div>
                        <small className="text-muted text-decoration-line-through">{book.originalPrice}</small>
                      </div>
                      <button 
                        className="btn btn-primary rounded-pill px-3"
                        onClick={() => alert(`Buku "${book.title}" berhasil dimasukkan ke keranjang belanja!`)}
                      >
                        <i className="bi bi-cart-plus me-1"></i> Beli
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROMO CALLOUT BANNER */}
      <section className="py-5">
        <div className="container">
          <div className="p-5 rounded-4 hero-gradient shadow-lg text-white text-center position-relative overflow-hidden">
            <div className="position-relative z-1 py-3" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3">
                KODE VOUCHER: BUKUBARU50
              </span>
              <h2 className="display-5 fw-bold mb-3">Gebyar Festival Literasi 2026</h2>
              <p className="lead mb-4 text-white-50">
                Gunakan kode voucher di atas untuk mendapatkan potongan diskon langsung Rp 50.000 
                setiap pembelian minimal Rp 150.000. Berlaku untuk seluruh kategori buku!
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button 
                  className="btn btn-warning btn-lg fw-bold px-4 rounded-pill shadow"
                  onClick={() => alert('Voucher BUKUBARU50 berhasil diklaim!')}
                >
                  <i className="bi bi-gift-fill me-2"></i> Klaim Voucher Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase small">Ulasan Pembaca</span>
            <h2 className="fw-bold mt-1">Apa Kata Sahabat Pembaca Kami?</h2>
            <p className="text-muted">Kepuasan pembaca adalah prioritas utama kami dalam menghadirkan buku berkualitas.</p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white hover-lift">
                  <div className="mb-3 text-warning">
                    {[...Array(t.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill me-1"></i>
                    ))}
                  </div>
                  <p className="card-text text-muted fst-italic mb-4">
                    "{t.comment}"
                  </p>
                  <div className="d-flex align-items-center mt-auto">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="rounded-circle me-3" 
                      width="50" 
                      height="50"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{t.name}</h6>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
