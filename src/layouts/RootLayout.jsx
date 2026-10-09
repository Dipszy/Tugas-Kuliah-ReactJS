import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import initialBooks from '../utils/books';

function RootLayout() {
  const { pathname } = useLocation();

  // State Hooks untuk data buku (Pertemuan 3)
  const [books, setBooks] = useState(initialBooks);

  // Fungsi menambah data buku menggunakan Hooks (Nilai Tambah)
  const addBook = (newBook) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Global Navigation Bar */}
      <Navbar bookCount={books.length} />

      {/* Dynamic Page Content Rendered by React Router with Context */}
      <main className="main-content flex-grow-1">
        <Outlet context={{ books, addBook }} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;
