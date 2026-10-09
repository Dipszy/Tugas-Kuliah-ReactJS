import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import defaultBooks from '../utils/books';

function Book() {
  const context = useOutletContext();
  const books = context?.books || defaultBooks;
  const addBook = context?.addBook;

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form State for Adding Book (Hooks)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    description: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert('Judul dan Penulis buku wajib diisi!');
      return;
    }

    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      year: parseInt(formData.year) || new Date().getFullYear(),
      description: formData.description || 'Deskripsi buku belum ditambahkan.',
      image: formData.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    };

    if (addBook) {
      addBook(newBook);
    }

    // Reset Form & Close Modal
    setFormData({
      title: '',
      author: '',
      year: new Date().getFullYear(),
      description: '',
      image: ''
    });
    setShowModal(false);
  };

  // Filter books by search term
  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-page pb-5">
      {/* 1. HEADER SECTION */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-2">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-2">
                <i className="bi bi-collection-fill me-1"></i> Koleksi Lengkap
              </span>
              <h1 className="display-5 fw-bold text-dark mb-1">
                Katalog <span className="text-primary">Buku Pilihan</span>
              </h1>
              <p className="text-muted mb-0">
                Menampilkan koleksi buku berkualitas untuk menunjang wawasan dan keahlian Anda.
              </p>
            </div>

            {/* BUTTON TAMBAH BUKU (Hooks Feature) */}
            <div>
              <button 
                type="button" 
                className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-circle-fill fs-5"></i>
                <span>Tambah Buku Baru</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CONTROLS */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-md-6 col-lg-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0" 
                  placeholder="Cari berdasarkan judul atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary border-start-0" 
                    type="button" 
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-6 col-lg-7 text-md-end text-muted small">
              Menampilkan <strong>{filteredBooks.length}</strong> dari total <strong>{books.length}</strong> buku
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOOKS GRID (MAP METHOD) */}
      <section className="py-5">
        <div className="container">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-journal-x fs-1 text-muted d-block mb-3"></i>
              <h4 className="fw-bold text-muted">Buku Tidak Ditemukan</h4>
              <p className="text-muted">Coba kata kunci pencarian yang lain.</p>
              <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => setSearchTerm('')}>
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredBooks.map((book) => (
                <div className="col-sm-6 col-lg-4" key={book.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift bg-white d-flex flex-column">
                    <div className="position-relative">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="card-img-top book-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 rounded-pill px-3 py-2">
                        Tahun {book.year}
                      </span>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary-subtle text-primary small">
                          <i className="bi bi-person-fill me-1"></i> {book.author}
                        </span>
                      </div>

                      <h5 className="card-title fw-bold text-dark mb-2">{book.title}</h5>
                      <p className="card-text text-muted small flex-grow-1 mb-4">
                        {book.description}
                      </p>

                      <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                          onClick={() => alert(`Detail Buku: "${book.title}" karya ${book.author} (${book.year})`)}
                        >
                          <i className="bi bi-info-circle me-1"></i> Detail
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary btn-sm rounded-pill px-3"
                          onClick={() => alert(`Buku "${book.title}" berhasil dimasukkan ke keranjang!`)}
                        >
                          <i className="bi bi-cart-plus me-1"></i> Beli Buku
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. MODAL TAMBAH BUKU (Bootstrap Modal) */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                  <i className="bi bi-plus-circle text-primary"></i> Tambah Data Buku Baru
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Judul Buku <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title"
                      placeholder="Contoh: Belajar Vue.js 3 Modern"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-8">
                      <label className="form-label fw-semibold">Penulis <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="author"
                        placeholder="Contoh: Rian Pratama"
                        required
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label fw-semibold">Tahun Terbit</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="year"
                        placeholder="2024"
                        value={formData.year}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Deskripsi Buku</label>
                    <textarea 
                      className="form-control" 
                      name="description"
                      rows="3"
                      placeholder="Ringkasan atau sinopsis singkat buku..."
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">URL Gambar Sampul (Opsional)</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      name="image"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                    <small className="text-muted">Biarkan kosong untuk menggunakan gambar default.</small>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light rounded-bottom-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary rounded-pill px-4 shadow-sm"
                  >
                    <i className="bi bi-save me-1"></i> Simpan Buku
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
