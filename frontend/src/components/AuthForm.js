import React from 'react';
import '../styles/AuthForm.css';

const AuthForm = ({ title, subtitle, children, onSubmit }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{title}</h2>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        <form onSubmit={onSubmit} className="auth-form">
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
