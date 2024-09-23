import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-black to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
            R-Auth
          </h1>
        </Link>
        <ul className="flex gap-8 text-lg">
          <li>
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/signin" className="text-gray-300 hover:text-blue-400 transition duration-300">
              SignIn
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-gray-300 hover:text-blue-400 transition duration-300">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-300 hover:text-blue-400 transition duration-300">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
