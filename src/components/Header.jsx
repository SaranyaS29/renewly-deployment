import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace with your logo path

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = (e) => {
    if (token) {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('mobile');
      navigate('/');
    }
  };

  return (
    <header className="text-black px-4 py-4 shadow">
      <nav className="flex items-center max-w-7xl mx-auto w-full relative">
        {/* Left side: Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide mr-4"
          onClick={handleLogout}
        >
          <span className="text-blue-500">R</span>enewly 
        </Link>
        
        
        <div className="ml-auto flex items-center space-x-4 text-2xl">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
