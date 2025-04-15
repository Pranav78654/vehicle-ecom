import React, { useState, useRef } from 'react';
import sideImage from '../assets/gta-6.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();
  const passwordInputRef = useRef(null); // For auto-focus to password

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'phone') {
      const sanitizedValue = value.replace(/\D/g, '');

      if (sanitizedValue.length > 10) {
        setPhoneError('Phone number cannot exceed 10 digits');
      } else {
        setPhoneError('');
        // Auto move to password field if 10 digits
        if (sanitizedValue.length === 10 && passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }

      setFormData({ ...formData, [id]: sanitizedValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/login',
        {
          phone: formData.phone,
          password: formData.password,
        },
        { withCredentials: true } // 👈 Important for backend cookies
      );
      
      alert('Login Successful ✅');
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'An unexpected error occurred';
      setMessage(errorMsg);
      console.error('Error logging in:', error);
    }
  };

  const isPhoneValid = formData.phone.length === 10 && !phoneError;

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <div className="bg-[#2c2231]/70 shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden w-[896px] h-[658.4px]">
        {/* Left Image Side */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <img src={sideImage} alt="Side Illustration" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4 text-base font-medium space-x-3 flex">
            <a href="/login" className="px-4 py-2 rounded-lg bg-[#753B64] text-white hover:opacity-90">Login</a>
            <a href="/signup" className="px-4 py-2 rounded-lg bg-[#753B64] text-white hover:opacity-90">Sign up</a>
          </div>

          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="mb-8 text-gray-300">Log in to continue to your account</p>

          {message && <div className="mb-4 text-red-500 text-sm">{message}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white"
              />
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            <div className="mb-2 relative">
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mb-4 text-right">
              <a href="/forgot-password" className="text-sm text-gray-300 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#753B64] text-white p-3 rounded-3xl hover:opacity-90 transition-all duration-200 shadow-lg cursor-pointer"
              disabled={!isPhoneValid}
            >
              <span className="font-bold">Log In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
