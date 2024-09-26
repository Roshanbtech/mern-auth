import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
    <Header />
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
      {/* Padding top (pt-24) to avoid overlap with the fixed header */}
      <div className="p-6 max-w-lg w-full bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold text-blue-400 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="userName"
            className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="userEmail"
            className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="userPassword"
            className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <button 
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-300"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className="flex gap-2 mt-5 justify-center">
          <p className="text-gray-300">Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500 hover:underline">Sign in</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5 text-center'>{error && 'Something went wrong!'}</p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
