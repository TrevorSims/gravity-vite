// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsAdmin(false); // Log out the staff member
    setIsMenuOpen(false); // Close the menu after logging out
  };

  return (
    <header className="flex justify-between items-center p-4 text-white fixed top-0 w-full z-50 shadow-md bg-rainbow-stripes">
      {/* Hamburger Button - Left Side */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200 z-50 fixed top-2 left-4"
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Gravity Text - Right Side */}
      {/*
      <div className="text-2xl font-semibold ml-auto">
        Gravity
      </div>
      */}

      {/* Logo - Right Side */}
      <div className="ml-auto">
        <img 
          src="/gravitylogo.png" 
          alt="Gravity Logo" 
          className="w-24 h-auto"
        />
      </div>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-40 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-start p-4 space-y-4 mt-20">
          <Link to="/" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/calendar" className="hover:text-gray-300" onClick={toggleMenu}>
            Calendar
          </Link>
          {isAdmin && (
            <Link to="/contacts" className="hover:text-gray-300" onClick={toggleMenu}>
              Contact List
            </Link>
          )}
          {isAdmin && (
            <Link to="/manage-events" className="hover:text-gray-300" onClick={toggleMenu}>
              Manage Events
            </Link>
          )}

          {/* Styled Log Out Button */}
          {isAdmin && (
            <button
              onClick={handleLogout}
              className="w-full text-red-500 bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-200 text-left mt-4"
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
