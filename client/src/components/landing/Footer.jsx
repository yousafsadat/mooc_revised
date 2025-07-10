import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} MOOC Platform. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2 text-blue-500 text-xs">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#get-started" className="hover:underline">Get Started</a>
        <a href="#demo" className="hover:underline">Request Demo</a>
      </div>
    </footer>
  );
};

export default Footer;
