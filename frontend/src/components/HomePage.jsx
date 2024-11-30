import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-400">G-Shopee</h1>
        <FaPowerOff
          className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition"
          onClick={handleLogout}
        />
      </header>

      <div className="relative">
        <div
          className="h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://preview.redd.it/what-video-game-franchise-would-make-you-buy-switch-v0-6oajp955yc9b1.jpg?auto=webp&s=5f8b5fcacf915e8608c4d3b9f1fc6d2b69ba82b0')`,
          }}
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
            <h2 className="text-4xl font-bold text-center text-indigo-400">G-Shopeeeeee</h2>
          </div>
        </div>
      </div>

      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition transform hover:scale-105 hover:bg-gray-700 group">
            <img
              src="https://via.placeholder.com/150"
              alt="Game 1"
              className="w-full h-40 object-cover rounded mb-4 opacity-90"
            />
            <h3 className="text-lg font-bold mb-2">Adventure Quest</h3>
            <p className="text-gray-400 text-sm mb-4">Embark on an epic journey through mystical lands.</p>
            <div className="flex justify-between">
              <button className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition">
                Add to Cart
              </button>
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
                Buy Now
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition transform hover:scale-105 hover:bg-gray-700 group">
            <img
              src="https://via.placeholder.com/150"
              alt="Game 2"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Fantasy World</h3>
            <p className="text-gray-400 text-sm mb-4">Explore enchanted forests and battle legendary creatures.</p>
            <div className="flex justify-between">
              <button className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition">
                Add to Cart
              </button>
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
                Buy Now
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition transform hover:scale-105 hover:bg-gray-700 group">
            <img
              src="https://via.placeholder.com/150"
              alt="Game 3"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Speed Racer</h3>
            <p className="text-gray-400 text-sm mb-4">Race against the clock in high-octane challenges.</p>
            <div className="flex justify-between">
              <button className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition">
                Add to Cart
              </button>
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-center p-4">
        <p className="text-gray-400 text-sm">&copy; 2024 G-Shopee by pyto-p. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
