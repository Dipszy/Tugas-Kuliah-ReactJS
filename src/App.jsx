import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './components/Home';
import Team from './components/Team';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route: Mengelompokkan elemen navigasi (Navbar, Outlet, Footer) */}
        <Route path="/" element={<RootLayout />}>
          {/* Index Route: Halaman Beranda (Home) */}
          <Route index element={<Home />} />

          {/* Halaman Informasi & Tim (Team) */}
          <Route path="team" element={<Team />} />

          {/* Halaman Kontak & Bantuan (Contact) */}
          <Route path="contact" element={<Contact />} />

          {/* Catch-all 404: Penanganan rute yang tidak ditemukan */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
