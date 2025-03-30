// === File: src/context/AuthContext.jsx ===
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('AuthContext: found stored user in localStorage');
      setUser(JSON.parse(storedUser));
    } else {
      console.log('AuthContext: no stored user');
    }
  }, []);

  const login = (token, userData) => {
    console.log('AuthContext: logging in user', userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('AuthContext: logging out user');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;
  console.log('AuthContext: isAuthenticated =', isAuthenticated);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
