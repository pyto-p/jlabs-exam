import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-6xl font-bold text-indigo-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-gray-400 text-lg mb-6 text-center">
        The page you're looking for doesn't exist. Maybe you'd like to explore some games instead?
      </p>
      <Link
        to="/"
        className="bg-indigo-500 px-6 py-3 rounded text-white hover:bg-indigo-600 transition"
      >
        Go to Login Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
