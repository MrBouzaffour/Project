import React from 'react';
import '../styles/AuthForm.css';

const AuthForm = ({ title, children, onSubmit }) => {
  return (
    <div className="auth-page-wrapper">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">{title}</h2>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
