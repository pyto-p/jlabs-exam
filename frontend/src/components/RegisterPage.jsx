import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (passwordError || confirmPasswordError) {
      return;
    }
    try {
      await ky.post(`${API_URL}/api/auth/register`, {
        json: { name, email, password },
      });
      navigate('/');
    } catch (err) {
      setServerError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618508684170-37290be9cc16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
        }}
      ></div>
      <div
        className={`relative z-10 bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-white transform transition-opacity duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Join GameStore</h2>
        {serverError && <p className="text-red-500 mb-4 text-center">{serverError}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="block w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300"
            required
          />
          {passwordError && <p className="text-red-500 mb-4 text-center">{passwordError}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="block w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300"
            required
          />
          {confirmPasswordError && (
            <p className="text-red-500 mb-4 text-center">{confirmPasswordError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600 transition transform duration-300 hover:scale-105"
            disabled={passwordError || confirmPasswordError}
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-6 text-center">
          Already have an account?{' '}
          <a href="/" className="text-indigo-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
