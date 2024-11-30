import React, { useState } from 'react';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
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
      await ky.post('http://localhost:8888/api/auth/register', {
        json: { name, email, password }
      });

      navigate('/');
    } catch (err) {
      setServerError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Register</h2>

        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
          required
          />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
          required
          />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="block w-full p-2 mb-4 border rounded"
          required
          />
        
        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange} // Real-time validation
          className={`block w-full p-2 mb-1 border rounded ${
            confirmPasswordError ? 'border-red-500' : ''
          }`}
          required
        />

        {confirmPasswordError && (
          <p className="text-red-500 mb-4 text-sm">{confirmPasswordError}</p>
        )}

        <button 
          type="submit" 
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
          disabled={passwordError || confirmPasswordError}
        >
          Register
        </button>
        <p className="text-sm mt-4">
          Already have an account?{' '}
          <a href="/" className="text-indigo-500 hover:text-indigo-700">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
