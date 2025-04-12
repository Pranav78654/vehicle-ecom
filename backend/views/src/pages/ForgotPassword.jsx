import React, { useState } from 'react';
import sideImage from '../assets/gta-6.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhone(value);
      setError('');
    } else {
      setError('Phone number cannot exceed 10 digits');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/forgot-password', { phone });
      setMessage(response.data.message || 'Reset link sent successfully ✅');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'An unexpected error occurred';
      setError(errorMsg);
      console.error('Error in forgot password:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <div className="bg-[#2c2231]/70 shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden w-[896px] h-[658.4px]">
        {/* Left Image Side */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <img src={sideImage} alt="Side Illustration" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          {/* Login / Sign up Buttons */}
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

          <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
          <p className="mb-8 text-gray-300">Enter your phone number to reset your password</p>

          {message && <div className="mb-4 text-green-500 text-sm">{message}</div>}
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-500 rounded bg-transparent text-white focus:outline-none focus:ring-0"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#753B64] text-white p-3 rounded-3xl hover:opacity-90 transition-all duration-200 shadow-lg cursor-pointer"
              disabled={phone.length !== 10 || !!error}
            >
              <span className="font-bold">Reset Password</span>
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-gray-300 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
