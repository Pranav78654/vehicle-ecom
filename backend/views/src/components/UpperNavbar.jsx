import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import Cookies from 'js-cookie';

const UpperNavbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check for user name in cookies when component mounts
    const nameFromCookies = Cookies.get('userName');
    if (nameFromCookies) {
      setUserName(nameFromCookies);
    }
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-4 flex items-center justify-between border-b border-white/30 shadow-md w-full h-20"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
    >
      {/* Left Section (Logo) */}
      <div className="flex items-center pl-4 w-70">
        <img src={logo} alt="Logo" className="w-35" />
      </div>

      {/* Centered Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="w-[90%] max-w-lg">
          <div className="relative flex items-center bg-[#6b7280]/70 rounded-full overflow-hidden">
            <span className="absolute left-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-300 pl-10 pr-16 py-2 w-full focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-[#f59e0b] text-white px-4 py-2 text-sm rounded-r-full hover:cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (User & Cart) */}
      <div className="flex items-center space-x-4">
        {/* User Section */}
        <div className="flex items-center space-x-3 pr-5">
          <FontAwesomeIcon icon={faUser} className="text-white" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">HELLO</span>
            <div className="flex space-x-2 text-sm text-white">
              {userName ? (
                <span>{userName}</span>
              ) : (
                <a href="/login" className="hover:underline">SIGN IN | REGISTER</a>
              )}
            </div>
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <FontAwesomeIcon icon={faShoppingCart} className="text-white text-xl" />
          <div className="flex flex-col">
            <span className="text-sm text-white">Shopping Cart</span>
            <span className="text-sm text-white">Rs. 0.00</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default UpperNavbar;