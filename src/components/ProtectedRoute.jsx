import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * @param {Array<string>} allowedRoles - daftar role yang diizinkan mengakses rute (e.g. ['admin'], ['user', 'admin'])
 * @param {React.ReactNode} children - elemen child (opsional, jika tidak memakai <Outlet />)
 */
function ProtectedRoute({ allowedRoles = [], children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // 1. Jika belum login sama sekali, redirect ke halaman Login dengan membawa state origin
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Jika rute memiliki pembatasan role tertentu dan role user tidak memenuhi kriteria
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect ke halaman 403 Access Denied
    return <Navigate to="/unauthorized" state={{ attemptedPath: location.pathname }} replace />;
  }

  // 3. Jika lolos seluruh pemeriksaan keamanan, render konten rute
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
