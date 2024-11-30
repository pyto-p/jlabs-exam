import React, { useState } from 'react';
import ky from 'ky';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const { token } = await ky
        .post('http://localhost:8888/api/auth/login', {
          json: { email, password },
        })
        .json();

      localStorage.setItem('token', token);

      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>


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
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
          required
          />
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
          Login
        </button>
        <p className="text-sm mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
