import React from 'react';
import BubbleText from '../components/BubbleText';

export default function About() {
  return (
    <div className='bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center py-12'>
      {/* Centered layout with background theme */}
      <div className='px-6 py-8 max-w-2xl w-full bg-gray-900 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-blue-400'>About</h1>
        <p className='mb-4 text-gray-300'>
          This is a MERN (MongoDB, Express, React, Node.js) stack application with
          authentication. It allows users to sign up, log in, and log out, and
          provides access to protected routes only for authenticated users.
        </p>
        <p className='mb-4 text-gray-300'>
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
        </p>
        <p className='mb-4 text-gray-300'>
          This application is intended as a starting point for building full-stack
          web applications with authentication using the MERN stack. Feel free to
          use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
}
