import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Page Content Rendered by React Router */}
      <main className="main-content flex-grow-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;
