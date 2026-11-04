import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ManageAuthors() {
  const { authors, addAuthor, updateAuthor, deleteAuthor } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'success' });

  // Form State for create/edit author
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    specialty: '',
    booksCount: 1,
    bio: '',
    avatar: ''
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
      email: '',
      specialty: '',
      booksCount: 1,
      bio: '',
      avatar: ''
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (author) => {
    setModalMode('edit');
    setFormData({
      id: author.id,
      name: author.name,
      email: author.email || '',
      specialty: author.specialty || '',
      booksCount: author.booksCount || 1,
      bio: author.bio || '',
      avatar: author.avatar || ''
    });
    setShowModal(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (author) => {
    setSelectedAuthor(author);
    setShowDeleteModal(true);
  };

  // Confirm Delete Action
  const handleConfirmDelete = () => {
    if (selectedAuthor) {
      deleteAuthor(selectedAuthor.id);
      setShowDeleteModal(false);
      showAlert(`Author "${selectedAuthor.name}" berhasil dihapus dari sistem!`, 'danger');
      setSelectedAuthor(null);
    }
  };

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

    if (modalMode === 'create') {
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
      showAlert(`Author "${newAuthor.name}" berhasil ditambahkan!`, 'success');
    } else {
      // Edit / Update mode
      const updated = {
        id: formData.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        specialty: formData.specialty.trim(),
        booksCount: parseInt(formData.booksCount, 10) || 1,
        bio: formData.bio.trim(),
        avatar: formData.avatar.trim()
      };
      updateAuthor(updated);
      showAlert(`Data author "${updated.name}" berhasil diperbarui!`, 'info');
    }

    setShowModal(false);
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
                CRUD Author Master
              </span>
              <span className="text-muted small">Total: {authors.length} Penulis</span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Manajemen Author (Penulis)</h3>
            <p className="text-muted mb-0 small">
              Kelola data pengarang buku secara terpadu: <strong>Create</strong>, <strong>Read</strong>, <strong>Update</strong>, dan <strong>Delete</strong>.
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-success rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
              onClick={handleOpenCreate}
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Tambah Author Baru</span>
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

      {/* Authors Grid (Cards View with Update & Delete Controls) */}
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

                {/* Actions Row: Update & Delete */}
                <div className="pt-3 border-top mt-auto d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
                    <i className="bi bi-book me-1 text-primary"></i> {author.booksCount || 0} Karya Buku
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-success rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleOpenEdit(author)}
                      title="Edit Data Author"
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3 d-flex align-items-center gap-1"
                      onClick={() => handleOpenDelete(author)}
                      title="Hapus Author"
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

      {/* Modal Create & Update Author */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom px-4 pt-4">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <span className={`p-2 bg-${modalMode === 'create' ? 'success' : 'warning'} bg-opacity-10 text-${modalMode === 'create' ? 'success' : 'dark'} rounded-3`}>
                    <i className={`bi ${modalMode === 'create' ? 'bi-person-plus-fill' : 'bi-pencil-square'}`}></i>
                  </span>
                  <span>{modalMode === 'create' ? 'Tambah Author Baru' : 'Perbarui (Update) Author'}</span>
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
                    <label className="form-label fw-semibold">Spesialisasi / Bidang Utama</label>
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
                      Kosongkan bila ingin menggunakan foto avatar default.
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
                  <button
                    type="submit"
                    className={`btn btn-${modalMode === 'create' ? 'success' : 'warning'} rounded-pill px-4 shadow-sm fw-semibold`}
                  >
                    <i className={`bi ${modalMode === 'create' ? 'bi-save' : 'bi-check2-circle'} me-1`}></i>
                    {modalMode === 'create' ? 'Simpan Author' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Delete Author */}
      {showDeleteModal && selectedAuthor && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-body p-4 text-center">
                <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex mb-3">
                  <i className="bi bi-person-x-fill fs-1"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Konfirmasi Hapus Author</h5>
                <p className="text-muted small mb-4">
                  Apakah Anda yakin ingin menghapus data author <strong>"{selectedAuthor.name}"</strong>? Data yang dihapus tidak dapat dipulihkan kembali.
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

export default ManageAuthors;
