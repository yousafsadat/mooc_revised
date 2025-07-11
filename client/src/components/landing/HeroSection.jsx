import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="px-6 pt-24 pb-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Transform Your Learning Experience</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Join thousands of students mastering new skills with our interactive MOOC platform.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/courses">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Browse Courses
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            My Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
