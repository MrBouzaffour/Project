import React from 'react';
import { Link } from 'react-router-dom';

const CTAButtons = () => (
  <div className="cta-buttons">
    <Link to="/login" className="btn btn-primary">Login</Link>
    <span className="btn-spacer" />
    <Link to="/register" className="btn btn-secondary">Register</Link>
  </div>
);

export default CTAButtons;
