import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './components/Home';
import Book from './components/Book';
import Team from './components/Team';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageGenres from './pages/admin/ManageGenres';
import ManageAuthors from './pages/admin/ManageAuthors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            1. PUBLIC STOREFRONT ROUTES (RootLayout)
           ========================================= */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<Book />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* =========================================
            2. ADMIN PANEL ROUTES (AdminLayout)
           ========================================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="genres" element={<ManageGenres />} />
          <Route path="authors" element={<ManageAuthors />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
