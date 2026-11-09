import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public & User Pages
import Home from './components/Home';
import Book from './components/Book';
import Team from './components/Team';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageGenres from './pages/admin/ManageGenres';
import ManageAuthors from './pages/admin/ManageAuthors';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ====================================================
              1. PUBLIC & USER STOREFRONT ROUTES (RootLayout)
             ==================================================== */}
          <Route path="/" element={<RootLayout />}>
            {/* Rute Bebas (Dapat diakses siapapun / Guest) */}
            <Route index element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Rute Terproteksi: Profil Pengguna (Hanya untuk pengguna yang login) */}
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ====================================================
              2. PROTECTED ADMIN ROUTES (Hanya Role: admin)
             ==================================================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="genres" element={<ManageGenres />} />
            <Route path="authors" element={<ManageAuthors />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
