import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ManageGenres() {
  const { genres, addGenre, updateGenre, deleteGenre } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'success' });

  // Form State for create/edit genre
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    description: '',
    color: 'primary',
    bookCount: 0
  });

  const showAlert = (message, type = 'success') => {
    setAlertInfo({ show: true, message, type });
    setTimeout(() => {
      setAlertInfo({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      id: null,
      name: '',
      slug: '',
      description: '',
      color: 'primary',
      bookCount: 0
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (genre) => {
    setModalMode('edit');
    setFormData({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      description: genre.description,
      color: genre.color || 'primary',
      bookCount: genre.bookCount || 0
    });
    setShowModal(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (genre) => {
    setSelectedGenre(genre);
    setShowDeleteModal(true);
  };

  // Confirm Delete Action
  const handleConfirmDelete = () => {
    if (selectedGenre) {
      deleteGenre(selectedGenre.id);
      setShowDeleteModal(false);
      showAlert(`Genre "${selectedGenre.name}" berhasil dihapus dari sistem!`, 'danger');
      setSelectedGenre(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && modalMode === 'create') {
      const autoSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: autoSlug
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Nama genre wajib diisi!');
      return;
    }

    if (modalMode === 'create') {
      const newGenre = {
        id: Date.now(),
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description.trim() || 'Deskripsi genre belum ditambahkan.',
        color: formData.color || 'primary',
        bookCount: parseInt(formData.bookCount, 10) || 0
      };
      addGenre(newGenre);
      showAlert(`Genre "${newGenre.name}" berhasil ditambahkan!`, 'success');
    } else {
      // Edit / Update mode
      const updated = {
        id: formData.id,
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        color: formData.color,
        bookCount: parseInt(formData.bookCount, 10) || 0
      };
      updateGenre(updated);
      showAlert(`Data genre "${updated.name}" berhasil diperbarui!`, 'info');
    }

    setShowModal(false);
  };

  // Filter genres based on search
  const filteredGenres = genres.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-genres-page">
      {/* Page Header */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 fw-semibold small">
                CRUD Genre Master
              </span>
              <span className="text-muted small">Total: {genres.length} Genre</span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Manajemen Genre Buku</h3>
            <p className="text-muted mb-0 small">
              Kelola data genre buku secara lengkap: <strong>Create</strong>, <strong>Read</strong>, <strong>Update</strong>, dan <strong>Delete</strong>.
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
              onClick={handleOpenCreate}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Tambah Genre Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Notification */}
      {alertInfo.show && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible fade show rounded-4 border-0 shadow-sm mb-4`}
          role="alert"
        >
          <div className="d-flex align-items-center gap-2">
            <i
              className={`bi ${
                alertInfo.type === 'danger'
                  ? 'bi-trash3-fill'
                  : alertInfo.type === 'info'
                  ? 'bi-check-circle-fill'
                  : 'bi-check-circle-fill'
              } fs-5`}
            ></i>
            <div>{alertInfo.message}</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlertInfo({ show: false, message: '', type: 'success' })}
          ></button>
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
                placeholder="Cari genre berdasarkan nama atau deskripsi..."
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
            Menampilkan <strong>{filteredGenres.length}</strong> dari total <strong>{genres.length}</strong> genre
          </div>
        </div>
      </div>

      {/* Genre Grid (Cards View with Update & Delete Controls) */}
      <div className="row g-4 mb-4">
        {filteredGenres.length === 0 ? (
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
              <i className="bi bi-tags fs-1 text-muted mb-2"></i>
              <h5 className="fw-bold text-muted">Genre Tidak Ditemukan</h5>
              <p className="text-muted small">Tidak ada data genre yang sesuai dengan kata kunci pencarian Anda.</p>
              <div>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => setSearchTerm('')}>
                  Reset Pencarian
                </button>
              </div>
            </div>
          </div>
        ) : (
          filteredGenres.map((genre) => (
            <div className="col-12 col-md-6 col-xl-4" key={genre.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 bg-white hover-lift p-4 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className={`icon-box bg-${genre.color || 'primary'} bg-opacity-10 text-${genre.color || 'primary'}`}>
                    <i className="bi bi-tag-fill fs-4"></i>
                  </div>
                  <span className={`badge bg-${genre.color || 'primary'}-subtle text-${genre.color || 'primary'} rounded-pill px-3 py-2 fw-semibold`}>
                    {genre.bookCount || 0} Judul Buku
                  </span>
                </div>

                <h5 className="fw-bold text-dark mb-1">{genre.name}</h5>
                <code className="text-muted small mb-2 d-inline-block">#{genre.slug}</code>
                <p className="text-muted small flex-grow-1 mb-3">{genre.description}</p>

                {/* Actions Row: Update & Delete */}
                <div className="pt-3 border-top mt-auto d-flex justify-content-between align-items-center">
                  <span className="small text-muted">
                    <i className="bi bi-hash me-1"></i> ID: {genre.id}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleOpenEdit(genre)}
                      title="Edit Data Genre"
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleOpenDelete(genre)}
                      title="Hapus Genre"
                    >
                      <i className="bi bi-trash3"></i>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Create & Update Genre */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom px-4 pt-4">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <span className={`p-2 bg-${modalMode === 'create' ? 'primary' : 'warning'} bg-opacity-10 text-${modalMode === 'create' ? 'primary' : 'dark'} rounded-3`}>
                    <i className={`bi ${modalMode === 'create' ? 'bi-tag-fill' : 'bi-pencil-square'}`}></i>
                  </span>
                  <span>{modalMode === 'create' ? 'Tambah Genre Baru' : 'Perbarui (Update) Genre'}</span>
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
                      Nama Genre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Contoh: Sejarah & Biografi"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-7">
                      <label className="form-label fw-semibold">Slug URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        placeholder="sejarah-biografi"
                        value={formData.slug}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-5">
                      <label className="form-label fw-semibold">Warna Badge</label>
                      <select
                        className="form-select"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                      >
                        <option value="primary">Biru (Primary)</option>
                        <option value="success">Hijau (Success)</option>
                        <option value="warning">Kuning (Warning)</option>
                        <option value="danger">Merah (Danger)</option>
                        <option value="info">Cyan (Info)</option>
                        <option value="secondary">Abu (Secondary)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Estimasi Jumlah Buku</label>
                    <input
                      type="number"
                      className="form-control"
                      name="bookCount"
                      placeholder="0"
                      min="0"
                      value={formData.bookCount}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-0">
                    <label className="form-label fw-semibold">Deskripsi Genre</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      placeholder="Penjelasan singkat mengenai kategori genre buku ini..."
                      value={formData.description}
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
                  <button
                    type="submit"
                    className={`btn btn-${modalMode === 'create' ? 'primary' : 'warning'} rounded-pill px-4 shadow-sm fw-semibold`}
                  >
                    <i className={`bi ${modalMode === 'create' ? 'bi-save' : 'bi-check2-circle'} me-1`}></i>
                    {modalMode === 'create' ? 'Simpan Genre' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Delete Genre */}
      {showDeleteModal && selectedGenre && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-body p-4 text-center">
                <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex mb-3">
                  <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Konfirmasi Hapus Genre</h5>
                <p className="text-muted small mb-4">
                  Apakah Anda yakin ingin menghapus genre <strong>"{selectedGenre.name}"</strong>? Data yang dihapus tidak dapat dipulihkan kembali.
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill px-4 shadow-sm"
                    onClick={handleConfirmDelete}
                  >
                    <i className="bi bi-trash3 me-1"></i> Ya, Hapus Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageGenres;
