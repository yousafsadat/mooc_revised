import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton } from '@mui/material';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600';

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/about', label: 'About Us' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full bg-white px-6 py-4 flex justify-between items-center transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600 tracking-wide">
          #MOOC
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm hover:text-blue-600 transition ${isActive(link.path)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Sign In */}
        <div className="hidden md:flex">
          <a className='px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white mr-2 text-sm' href="https://smartgpa.netlify.app/">Prediction</a>
          <Link to="/login">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:opacity-90 transition">
              Sign In
            </button>
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon fontSize="medium" />
          </IconButton>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="w-64 p-5 space-y-6">
          {/* Close icon */}
          <div className="flex justify-end">
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-base text-gray-700 hover:text-blue-600 transition"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="pt-6">
            {/* <a className='px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-10 text-sm' href="https://smartgpa.netlify.app/">Prediction</a> */}
            <Link to="/login">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-sm font-medium shadow hover:opacity-90 transition"
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
