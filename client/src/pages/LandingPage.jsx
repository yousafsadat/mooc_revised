import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import React from 'react';

const LandingPage = () => {
//   console.log('Landing Page Rendered');

  return (
    <div className="bg-white text-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
