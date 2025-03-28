import React from 'react';
import LandingHero from '../components/LandingHero';
import CTAButtons from '../components/CTAButtons';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingHero />
      <CTAButtons />
    </div>
  );
};

export default LandingPage;