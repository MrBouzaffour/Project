import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Channel Tool</h1>
      <p className="mb-6">A simple way to share programming problems and discuss solutions.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
