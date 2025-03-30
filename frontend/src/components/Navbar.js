import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__brand">ChannelTool</Link>
      </div>
      <div className="navbar__right">
        {user ? (
          <>
            <Link to="/home" className="navbar__link">Home</Link>
            <button onClick={logout} className="navbar__button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
