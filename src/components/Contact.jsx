import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'Pemesanan & Status Buku',
    message: '',
    agree: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'Pemesanan & Status Buku',
        message: '',
        agree: false
      });
    }, 1000);
  };

  const contactCards = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Kantor & Toko Fisik',
      desc: 'Jl. Literasi Nusantara No. 88, Menteng, Jakarta Pusat 10310',
      badge: 'Buka Setiap Hari'
    },
    {
      icon: 'bi-whatsapp',
      title: 'WhatsApp & Telepon',
      desc: '+62 812-3456-7890 / (021) 555-8900',
      badge: 'Respon Cepat'
    },
    {
      icon: 'bi-envelope-at-fill',
      title: 'Email Resmi',
      desc: 'halo@bookstore.id & support@bookstore.id',
      badge: '24 Jam'
    },
    {
      icon: 'bi-clock-fill',
      title: 'Jam Layanan Online',
      desc: 'Senin - Minggu: 08.00 - 22.00 WIB',
      badge: 'Siap Melayani'
    }
  ];

  const faqs = [
    {
      q: 'Apakah semua buku yang dijual 100% original?',
      a: 'Ya, seluruh buku di BookStore dijamin 100% asli bergaransi, dipasok langsung dari penerbit resmi dan terpercaya.'
    },
    {
      q: 'Berapa lama estimasi waktu pengiriman buku?',
      a: 'Untuk area Jabodetabek estimasi pengiriman adalah 1-2 hari kerja. Luar Jabodetabek berkisar 2-4 hari kerja tergantung kurir yang dipilih.'
    },
    {
      q: 'Bagaimana jika buku yang saya terima rusak atau salah judul?',
      a: 'Kami memberikan garansi penukaran buku baru gratis atau pengembalian dana 100% maksimal 7 hari setelah pesanan diterima.'
    },
    {
      q: 'Metode pembayaran apa saja yang tersedia?',
      a: 'Kami menerima pembayaran melalui QRIS, Transfer Bank (BCA, Mandiri, BNI, BRI), Virtual Account, GoPay, OVO, ShopeePay, serta fitur COD.'
    }
  ];

  return (
    <div className="contact-page pb-5">
      {/* 1. CONTACT HEADER */}
      <section className="py-5 bg-white border-bottom text-center">
        <div className="container py-3">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
            <i className="bi bi-headset me-1"></i> Pusat Bantuan & Kontak
          </span>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Hubungi <span className="text-primary">Tim BookStore</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '680px' }}>
            Punya pertanyaan mengenai pesanan, ingin menjalin kerjasama kemitraan, atau ingin berkonsultasi seputar buku? 
            Kami siap mendengarkan dan membantu Anda.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {contactCards.map((card, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white hover-lift">
                  <div className="icon-box bg-primary text-white mb-3">
                    <i className={`bi ${card.icon} fs-4`}></i>
                  </div>
                  <div className="badge bg-primary-subtle text-primary align-self-start mb-2 px-2 py-1 rounded">
                    {card.badge}
                  </div>
                  <h5 className="fw-bold mb-2 text-dark">{card.title}</h5>
                  <p className="text-muted small mb-0">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & LOCATION PREVIEW */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Left Column: Form */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <h3 className="fw-bold mb-2">Kirim Pesan Kepada Kami</h3>
                <p className="text-muted mb-4">
                  Isi formulir di bawah ini dan perwakilan customer support kami akan membalas pesan Anda dalam kurun waktu 1x24 jam.
                </p>

                {submitted && (
                  <div className="alert alert-success alert-dismissible fade show rounded-3 d-flex align-items-center" role="alert">
                    <i className="bi bi-check-circle-fill fs-4 me-3 text-success"></i>
                    <div>
                      <strong>Pesan Berhasil Terkirim!</strong>
                      <div>Terima kasih sudah menghubungi kami. Tim kami akan segera meninjau pesan Anda.</div>
                    </div>
                    <button type="button" className="btn-close" onClick={() => setSubmitted(false)} aria-label="Close"></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Nama Lengkap <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
                        <input 
                          type="text" 
                          name="name"
                          className="form-control" 
                          placeholder="Contoh: Budi Santoso"
                          required 
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Alamat Email <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                        <input 
                          type="email" 
                          name="email"
                          className="form-control" 
                          placeholder="nama@email.com"
                          required 
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Nomor WhatsApp / HP</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-phone"></i></span>
                        <input 
                          type="tel" 
                          name="phone"
                          className="form-control" 
                          placeholder="081234567890"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Kategori Pesan</label>
                      <select 
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option>Pemesanan & Status Buku</option>
                        <option>Konfirmasi Pembayaran</option>
                        <option>Kerjasama Penerbit & Pengadaan</option>
                        <option>Kritik & Saran Pengguna</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Subjek Pesan <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        name="subject"
                        className="form-control" 
                        placeholder="Ringkasan topik pertanyaan Anda"
                        required 
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Isi Pesan <span className="text-danger">*</span></label>
                      <textarea 
                        name="message"
                        className="form-control" 
                        rows="4" 
                        placeholder="Tuliskan pertanyaan atau informasi lengkap yang ingin Anda sampaikan..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="agreeCheck"
                          name="agree"
                          required
                          checked={formData.agree}
                          onChange={handleChange}
                        />
                        <label className="form-check-label small text-muted" htmlFor="agreeCheck">
                          Saya menyetujui bahwa data saya digunakan untuk keperluan komunikasi layanan BookStore.
                        </label>
                      </div>
                    </div>

                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
                        <i className="bi bi-send-fill me-2"></i> Kirim Pesan Sekarang
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Information & FAQ */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h5 className="fw-bold mb-3 d-flex align-items-center">
                  <i className="bi bi-clock-history text-primary me-2 fs-4"></i> Jam Kerja Operasional
                </h5>
                <ul className="list-group list-group-flush small">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Senin - Jumat</span>
                    <span className="fw-semibold text-dark">08:00 - 21:00 WIB</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Sabtu - Minggu</span>
                    <span className="fw-semibold text-dark">09:00 - 18:00 WIB</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Hari Libur Nasional</span>
                    <span className="badge bg-secondary-subtle text-secondary">Tetap Melayani Online</span>
                  </li>
                </ul>
              </div>

              {/* FAQ Accordion */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold mb-3 d-flex align-items-center">
                  <i className="bi bi-question-circle text-primary me-2 fs-4"></i> Pertanyaan Umum (FAQ)
                </h5>
                <div className="accordion accordion-flush" id="faqAccordion">
                  {faqs.map((faq, idx) => (
                    <div className="accordion-item" key={idx}>
                      <h2 className="accordion-header" id={`heading${idx}`}>
                        <button 
                          className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} px-0 fw-semibold text-dark small`}
                          type="button" 
                          data-bs-toggle="collapse" 
                          data-bs-target={`#collapse${idx}`} 
                          aria-expanded={idx === 0 ? 'true' : 'false'}
                          aria-controls={`collapse${idx}`}
                        >
                          {faq.q}
                        </button>
                      </h2>
                      <div 
                        id={`collapse${idx}`} 
                        className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} 
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body px-0 text-muted small">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
