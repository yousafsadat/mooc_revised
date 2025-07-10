import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600';

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Logo / Branding */}
      <Link to="/" className="text-xl font-bold text-black">
        MOOC Platform
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className={`text-sm hover:text-blue-600 transition ${isActive('/')}`}>
          Home
        </Link>
        <Link to="/about" className={`text-sm hover:text-blue-600 transition ${isActive('/about')}`}>
          About
        </Link>
        <Link to="/courses" className={`text-sm hover:text-blue-600 transition ${isActive('/courses')}`}>
          Courses
        </Link>
      </div>

      {/* Login Button */}
      <Link to="/login">
        <Button variant="outlined" color="primary">
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
