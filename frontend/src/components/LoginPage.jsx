import React, { useState } from 'react';
import ky from 'ky';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null); 
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError(null);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(null); 

    if (passwordError) {
      return;
    }

    try {
      const { token } = await ky
        .post('http://localhost:8888/api/auth/login', {
          json: { email, password },
        })
        .json();

      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      setServerError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>

        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        
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
        
        {passwordError && <p className="text-red-500 mb-4 text-center">{passwordError}</p>}

        <button 
          type="submit" 
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
          disabled={passwordError}
        >
          Login
        </button>
        <p className="text-sm mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-500 hover:text-indigo-700">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
