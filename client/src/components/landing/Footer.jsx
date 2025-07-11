import React from 'react';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Description */}
        <div className="flex-1 text-left mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">MOOC Platform</h3>
          <p className="text-sm text-gray-300">
            Empowering learners and educators with modern dashboards, predictive analytics, and seamless course management.
          </p>
          <div className="mt-3 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MOOC Platform. All rights reserved.
          </div>
        </div>

        {/* Navigation Links - horizontal and grouped */}
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <nav>
            <ul className="flex flex-wrap gap-6 md:gap-8 justify-center mb-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition font-medium">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-400 transition font-medium">Courses</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition font-medium">Dashboard</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition font-medium">Login / Signup</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition font-medium">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><Facebook /></a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter"><Twitter /></a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="Instagram"><Instagram /></a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="LinkedIn"><LinkedIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
