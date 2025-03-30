import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingHero from '../components/LandingHero';
import CTAButtons from '../components/CTAButtons';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="landing-page">
      <LandingHero />
      <CTAButtons />
    </div>
  );
};

export default LandingPage;
