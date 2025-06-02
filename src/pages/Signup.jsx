
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import login from "../assets/login.jpg"; // Assuming you have a login image

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/users/signup`, {
        name,
        mobile,
        email,
        password,
      });

      const data = response.data;
      console.log(data);
      if (data.token) {
        localStorage.setItem("name", name);
  localStorage.setItem("mobile", mobile);
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred during sign up. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white-50">
      <header className="flex justify-between items-center px-8 py-6">
      <h1 className="text-3xl font-semibold text-gray-900">
  <Link to="/" className="text-blue-600">R</Link>enewly
</h1>
        <div className="text-gray-600 text-2xl">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Log In
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center min-h-screen px-10 bg-white-50">
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl gap-20">
          <div className="w-full md:w-1/2">
            <img
              src={login}
              alt="Illustration"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-10 px-8">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Let's Get Started!</h2>
              <p className="text-gray-500 text-xl">Create your account to continue</p>
            </div>

            {error && <p className="text-red-500 text-lg">{error}</p>}

            {/* Name */}
            <div>
              <div className="flex items-center border-2 border-blue-600 rounded-xl px-6 py-5">
                <i className="fas fa-user text-blue-600 mr-4 text-xl"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <div className="flex items-center border-2 border-blue-600 rounded-xl px-6 py-5">
                <i className="fas fa-phone text-blue-700 mr-4 text-xl"></i>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center border-2 border-blue-600 rounded-xl px-6 py-5">
                <i className="fas fa-envelope text-blue-700 mr-4 text-xl"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center border-2 border-blue-600 rounded-xl px-6 py-5">
                <i className="fas fa-lock text-blue-700 mr-4 text-xl"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full outline-none text-gray-900 font-semibold text-xl placeholder-gray-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-700 text-white font-bold rounded-full px-16 py-5 text-xl hover:bg-blue-800 transition"
              >
                Sign Up
              </button>
            </div>

            <div className="text-sm text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-700 font-semibold hover:underline">
                  Log In
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;

