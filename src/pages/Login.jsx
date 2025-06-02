

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import login1 from '../assets/login1.jpg';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/users/login`, {
        email,
        password
      });

      const data = response.data;
      console.log('Login response data:', data);

      if (data.token) {
        
        localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);       // 👈 Add this line
      localStorage.setItem('mobile', data.phone);
        
        navigate('/dashboard');
      } else {
        throw new Error('Missing token in response');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col font-['Poppins']">
      <header className="flex justify-between items-center px-8 py-6">
      <h1 className="text-3xl font-semibold text-gray-900">
  <Link to="/" className="text-blue-700">
    R
  </Link>
  enewly
</h1>
        <div className="text-gray-600 text-2xl">
          New User?{' '}
          <a href="/signup" className="text-blue-700 font-semibold hover:underline">
            Sign Up
          </a>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center min-h-screen px-10 bg-white-50">
  <div className="flex flex-col md:flex-row items-center w-full max-w-7xl gap-20">
    
    {/* BIGGER ILLUSTRATION */}
    <div className="w-full  md:w-1/2">
      <img
        src={login1}
        alt="Illustration"
        className="w-full h-auto max-h-[1000px] object-contain"
      />
    </div>

    {/* BIGGER FORM */}
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-10 px-8">
      <div>
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
        <p className="text-gray-500 text-xl">Login to continue</p>
      </div>

      {error && <p className="text-red-500 text-lg">{error}</p>}

      <div>
        <div className="flex items-center border-2 border-blue-600 rounded-xl px-6 py-5 focus-within:ring-2 focus-within:ring-purple-600">
          <i className="fas fa-user text-blue-700 mr-4 text-xl"></i>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center border-2 border-gray-400 rounded-xl px-6 py-5 focus-within:ring-2 focus-within:ring-blue-600">
          <i className="fas fa-lock text-gray-700 mr-4 text-xl"></i>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold rounded-full px-16 py-5 text-xl hover:bg-blue-800 transition"
        >
          LOGIN
        </button>
        
      </div>

      
    </form>
  </div>
</main>


    </div>
  );
};

export default Login;
             