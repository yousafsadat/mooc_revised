import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-white to-blue-50">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 max-w-3xl">
        Empower Learning with Predictive Insights & Modern Dashboards
      </h1>
      <p className="text-gray-600 max-w-xl text-lg mb-6">
        An AI-powered MOOC platform for students, instructors, and administrators.
        Track progress, manage content, and predict dropouts.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/login">
          <Button variant="contained" size="large" color="primary">
            Get Started
          </Button>
        </Link>
        <Button variant="outlined" size="large" color="primary">
          Request Demo
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
