import React, { createContext, useContext, useState, useEffect } from 'react';

// Daftar Akun Demo untuk Pengujian Hak Akses
export const DEMO_ACCOUNTS = [
  {
    id: 1,
    name: 'Administrator Toko',
    email: 'admin@bookstore.id',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Super Admin dengan hak akses penuh ke seluruh pengaturan toko dan master data.'
  },
  {
    id: 2,
    name: 'Budi Pembaca',
    email: 'user@bookstore.id',
    password: 'user',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bio: 'Pengguna terdaftar dan penikmat literasi fiksi serta pemrograman web.'
  }
];

const AuthContext = createContext(null);

const STORAGE_KEY = 'bookstore_auth_user';

export function AuthProvider({ children }) {
  // Load initial user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth with localStorage', e);
    }
  }, [user]);

  // Login method by email and password
  const login = (email, password) => {
    const found = DEMO_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.password === password
    );

    if (found) {
      const userData = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        avatar: found.avatar,
        bio: found.bio
      };
      setUser(userData);
      return { success: true, user: userData };
    }

    return {
      success: false,
      message: 'Email atau kata sandi tidak cocok. Gunakan akun demo yang tersedia.'
    };
  };

  // Quick switch user role for testing / demo
  const switchAccount = (role) => {
    const target = DEMO_ACCOUNTS.find(acc => acc.role === role);
    if (target) {
      const userData = {
        id: target.id,
        name: target.name,
        email: target.email,
        role: target.role,
        avatar: target.avatar,
        bio: target.bio
      };
      setUser(userData);
      return userData;
    }
  };

  // Logout method
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    login,
    logout,
    switchAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
