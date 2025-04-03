import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <header className="site-header">
        <h2>CodeForm</h2>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Build, Share, and Solve</h1>
          <p className="hero-subtitle">
            CodeForm is your hub to post programming questions and offer real answers.
            Collaborate with a growing developer community today.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">🔐 Login</Link>
            <Link to="/register" className="btn btn-secondary">✍️ Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-dev.svg" alt="Developer Illustration" />
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>💬 Ask Programming Questions</h3>
          <p>Post questions about your code, bugs, or frameworks. Get community feedback fast.</p>
        </div>
        <div className="feature-card">
          <h3>🛠️ Provide Helpful Answers</h3>
          <p>Support fellow devs by providing answers, sharing snippets, and debugging together.</p>
        </div>
        <div className="feature-card">
          <h3>📈 Level Up with Every Post</h3>
          <p>Every interaction helps you grow as a developer and builds your expertise profile.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
