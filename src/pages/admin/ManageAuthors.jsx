import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ManageAuthors() {
  const { authors, addAuthor } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  // Form State for creating new author
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    booksCount: 1,
    bio: '',
    avatar: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Nama penulis/author wajib diisi!');
      return;
    }

    const newAuthor = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@penulis.id`,
      specialty: formData.specialty.trim() || 'Penulis Umum & Fiksi',
      booksCount: parseInt(formData.booksCount, 10) || 1,
      bio: formData.bio.trim() || 'Penulis aktif yang telah menerbitkan karya-karya bermutu bagi pembaca.',
      avatar:
        formData.avatar.trim() ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    };

    addAuthor(newAuthor);

    // Reset & close
    setFormData({
      name: '',
      email: '',
      specialty: '',
      booksCount: 1,
      bio: '',
      avatar: ''
    });
    setShowModal(false);
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 3000);
  };

  // Filter authors based on search
  const filteredAuthors = authors.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.email && a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="manage-authors-page">
      {/* Page Header */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 fw-semibold small">
                Master Data
              </span>
              <span className="text-muted small">Total: {authors.length} Penulis</span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Manajemen Author (Penulis)</h3>
            <p className="text-muted mb-0 small">
              Lihat (Read) profil seluruh pengarang buku dan daftarkan (Create) author baru ke sistem.
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-success rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Tambah Author Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successAlert && (
        <div className="alert alert-success alert-dismissible fade show rounded-4 border-0 shadow-sm mb-4" role="alert">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill fs-5 text-success"></i>
            <div>
              <strong>Berhasil Menambahkan Author!</strong> Profil penulis baru telah tercatat dalam sistem admin.
            </div>
          </div>
          <button type="button" className="btn-close" onClick={() => setSuccessAlert(false)}></button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-3">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Cari author berdasarkan nama atau bidang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-light border-0 text-muted"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8 text-md-end text-muted small">
            Menampilkan <strong>{filteredAuthors.length}</strong> dari total <strong>{authors.length}</strong> author
          </div>
        </div>
      </div>

      {/* Authors Grid (Cards View) */}
      <div className="row g-4 mb-4">
        {filteredAuthors.length === 0 ? (
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
              <i className="bi bi-person-x fs-1 text-muted mb-2"></i>
              <h5 className="fw-bold text-muted">Author Tidak Ditemukan</h5>
              <p className="text-muted small">Tidak ada data penulis yang sesuai dengan kata kunci pencarian Anda.</p>
              <div>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => setSearchTerm('')}>
                  Reset Pencarian
                </button>
              </div>
            </div>
          </div>
        ) : (
          filteredAuthors.map((author) => (
            <div className="col-12 col-md-6 col-xl-4" key={author.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 bg-white hover-lift p-4 d-flex flex-column">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="rounded-circle shadow-sm flex-shrink-0"
                    style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="fw-bold text-dark mb-0 text-truncate">{author.name}</h5>
                    <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small fw-semibold mt-1">
                      {author.specialty}
                    </span>
                    <div className="text-muted small mt-1 text-truncate">
                      <i className="bi bi-envelope me-1"></i>
                      {author.email}
                    </div>
                  </div>
                </div>

                <p className="text-muted small flex-grow-1 mb-3">{author.bio}</p>

                <div className="pt-3 border-top mt-auto d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
                    <i className="bi bi-book me-1 text-primary"></i> {author.booksCount || 0} Karya Buku
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                    onClick={() => alert(`Profil Author: ${author.name}\nEmail: ${author.email}\nSpesialisasi: ${author.specialty}`)}
                  >
                    <i className="bi bi-person-lines-fill me-1"></i> Detail
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Create Author */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom px-4 pt-4">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <span className="p-2 bg-success bg-opacity-10 text-success rounded-3">
                    <i className="bi bi-person-plus-fill"></i>
                  </span>
                  <span>Tambah Author Baru</span>
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
                    <label className="form-label fw-semibold">
                      Nama Lengkap Penulis <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Contoh: Raditya Dika"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-7">
                      <label className="form-label fw-semibold">Alamat Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="penulis@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-5">
                      <label className="form-label fw-semibold">Jumlah Karya</label>
                      <input
                        type="number"
                        className="form-control"
                        name="booksCount"
                        placeholder="1"
                        min="0"
                        value={formData.booksCount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Spesialisasi / Genre Utama</label>
                    <input
                      type="text"
                      className="form-control"
                      name="specialty"
                      placeholder="Contoh: Fiksi Komedi & Skenario Film"
                      value={formData.specialty}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">URL Foto Avatar (Opsional)</label>
                    <input
                      type="url"
                      className="form-control"
                      name="avatar"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.avatar}
                      onChange={handleInputChange}
                    />
                    <small className="text-muted" style={{ fontSize: '11px' }}>
                      Kosongkan bila ingin menggunakan foto default profil.
                    </small>
                  </div>

                  <div className="mb-0">
                    <label className="form-label fw-semibold">Biografi Singkat</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      rows="3"
                      placeholder="Ceritakan latar belakang kepenulisan atau prestasi author..."
                      value={formData.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light rounded-bottom-4 px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-success rounded-pill px-4 shadow-sm">
                    <i className="bi bi-save me-1"></i> Simpan Author
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

export default ManageAuthors;
