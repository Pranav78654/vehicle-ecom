import React, { useState } from 'react';
import sideImage from '../assets/gta-6.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
      });

      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('userName', response.data.user.name, { expires: 7 }); // Add this line
      alert('Account created successfully ✅');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <div className="bg-[#2c2231]/70 shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden w-[896px] h-[658.4px]">
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <img src={sideImage} alt="Side Illustration" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">

          {/* Added Login / Sign up Buttons - SAME AS LOGIN PAGE */}
          <div className="absolute top-4 right-4 text-base font-medium space-x-3 flex">
            <a
              href="/login"
              className="px-4 py-2 rounded-lg bg-[#753B64] text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:opacity-90"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 rounded-lg bg-[#753B64] text-white transition-all duration-200 backdrop-blur-md shadow-lg hover:opacity-90"
            >
              Sign up
            </a>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="mb-8 text-gray-300">Join us and start your journey!</p>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white focus:outline-none focus:ring-0"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white focus:outline-none focus:ring-0"
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-9 text-sm"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#753B64] text-white p-3 rounded-3xl hover:opacity-90 transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span className="font-bold">Sign Up</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
