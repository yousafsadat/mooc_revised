import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-blue-50 py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-black mb-4">
        Ready to Transform Your Learning Journey?
      </h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-6">
        Whether you're a student, instructor, or administrator — our platform is designed for you.
        Experience personalized dashboards and smart course management now.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/login">
          <Button variant="contained" size="large" color="primary">
            Get Started
          </Button>
        </Link>
        <Button variant="outlined" size="large" color="primary">
          Request a Demo
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
