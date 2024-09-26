import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Header from '../components/Header';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }

      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.error('Sign In Error:', error);
    }
  };

  return (
    <>
      <Header />
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
      {/* Padding top (pt-24) to avoid overlap with the fixed header */}
      <div className="p-8 max-w-lg w-full bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold text-blue-400 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="userEmail"
            className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="userPassword"
            className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-300"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5 justify-center">
          <p className="text-gray-300">Don't have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500 hover:underline">Sign up</span>
          </Link>
        </div>
        {error && (
          <p className="text-red-700 mt-5 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default SignIn;
