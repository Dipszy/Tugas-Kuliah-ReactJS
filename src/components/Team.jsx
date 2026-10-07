import React from 'react';

function Team() {
  const teamMembers = [
    {
      name: 'Aditya Pratama, S.Kom.',
      role: 'Founder & Chief Executive Officer',
      badge: 'Leadership',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Memiliki pengalaman lebih dari 8 tahun dalam industri edutech dan ekosistem perbukuan modern di Asia Tenggara.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Sarah Amanda Putri',
      role: 'Lead Frontend Engineer',
      badge: 'Engineering',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Fokus merancang antarmuka aplikasi web React yang interaktif, cepat, dan ramah pengguna di berbagai perangkat.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Bima Satria Nugraha',
      role: 'Head of Book Curation & Editor',
      badge: 'Editorial',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Kurator buku berpengalaman yang memastikan seluruh judul terbitan dan rekomendasi berkualitas tinggi bagi pembaca.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Dinda Maharani',
      role: 'Lead UI/UX Designer',
      badge: 'Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Menciptakan alur pengalaman pengguna yang intuitif, visual modern, dan aksesibilitas ramah bagi semua kalangan.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Fauzan Hidayat',
      role: 'Fullstack Developer',
      badge: 'Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Bertanggung jawab atas arsitektur backend, sistem pembayaran terintegrasi, dan keamanan data pelanggan.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Nadia Safitri',
      role: 'Digital Marketing & Community Lead',
      badge: 'Growth',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
      bio: 'Membangun komunitas pembaca aktif di berbagai media sosial dan merancang program promo menarik untuk pengguna.',
      social: { linkedin: '#', github: '#', twitter: '#' }
    }
  ];

  const values = [
    {
      icon: 'bi-lightbulb',
      title: 'Inovasi Digital',
      desc: 'Terus mengembangkan cara baru yang memudahkan siapa saja membaca dan membeli buku.'
    },
    {
      icon: 'bi-heart-pulse',
      title: 'Semangat Literasi',
      desc: 'Mendorong minat baca generasi muda Indonesia untuk masa depan yang lebih cerdas dan kritis.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Integritas & Orisinalitas',
      desc: 'Melawan pembajakan dengan hanya menyediakan karya asli dan mendukung hak cipta para penulis.'
    },
    {
      icon: 'bi-people',
      title: 'Kolaborasi Terbuka',
      desc: 'Bekerja bersama penerbit lokal, komunitas literasi, dan pembaca demi ekosistem yang sehat.'
    }
  ];

  return (
    <div className="team-page pb-5">
      {/* 1. TEAM HEADER */}
      <section className="py-5 bg-white border-bottom text-center">
        <div className="container py-3">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
            <i className="bi bi-people-fill me-1"></i> Tim Kami yang Hebat
          </span>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Mengenal Orang-Orang di Balik <span className="text-primary">BookStore</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Kami adalah tim yang berdedikasi tinggi menggabungkan kecintaan pada literasi dan keahlian teknologi
            untuk menghadirkan akses buku terbaik bagi masyarakat Indonesia.
          </p>
        </div>
      </section>

      {/* 2. TEAM MEMBERS GRID */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {teamMembers.map((member, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 bg-white hover-lift">
                  <div className="mb-3 position-relative d-inline-block mx-auto">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="team-avatar"
                    />
                    <span className="position-absolute bottom-0 end-0 badge bg-primary rounded-pill px-2 py-1 small">
                      {member.badge}
                    </span>
                  </div>

                  <h5 className="fw-bold mb-1 text-dark">{member.name}</h5>
                  <p className="text-primary fw-semibold small mb-3">{member.role}</p>
                  <p className="text-muted small mb-4">{member.bio}</p>

                  <div className="d-flex justify-content-center gap-2 mt-auto pt-3 border-top">
                    <a href={member.social.linkedin} className="social-icon-btn" title="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href={member.social.github} className="social-icon-btn" title="GitHub">
                      <i className="bi bi-github"></i>
                    </a>
                    <a href={member.social.twitter} className="social-icon-btn" title="Twitter / X">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="mailto:info@bookstore.id" className="social-icon-btn" title="Email">
                      <i className="bi bi-envelope-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase small">Nilai Utama</span>
            <h2 className="fw-bold mt-1">Prinsip & Budaya Kerja Tim</h2>
            <p className="text-muted">Landasan semangat kami dalam berkarya dan memberikan pelayanan terbaik.</p>
          </div>

          <div className="row g-4">
            {values.map((val, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-center hover-lift">
                  <div className="icon-box bg-primary text-white mx-auto mb-3">
                    <i className={`bi ${val.icon} fs-4`}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{val.title}</h5>
                  <p className="text-muted small mb-0">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CAREERS CALLOUT */}
      <section className="py-5">
        <div className="container">
          <div className="bg-primary bg-gradient text-white p-5 rounded-4 shadow text-center">
            <h3 className="fw-bold mb-2">Ingin Menjadi Bagian dari Cerita Kami?</h3>
            <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: '600px' }}>
              Kami selalu mencari talenta berbakat yang bersemangat dalam literasi dan teknologi. 
              Mari bergabung dan ciptakan dampak nyata bersama BookStore!
            </p>
            <button 
              className="btn btn-light text-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
              onClick={() => alert('Terima kasih atas minat Anda! Lowongan akan segera dibuka.')}
            >
              <i className="bi bi-briefcase me-2"></i> Lihat Peluang Karir
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
