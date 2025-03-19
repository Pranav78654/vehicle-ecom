import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo.jpg"
const UpperNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between w-full h-20">
      {/* Left Section (Logo) */}
      <div className="flex items-center pl-4 w-70">
        <img
          src={logo}
          alt="Logo"
          className=" w-35"
        />
      </div>

      {/* Centered Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="w-[90%] max-w-lg">
          <div className="relative flex items-center bg-gray-700 rounded-full overflow-hidden">
            <span className="absolute left-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-300 pl-10 pr-16 py-2 w-full focus:outline-none"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white px-4 py-2 text-sm rounded-r-full hover:cursor-pointer">
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
              <a href="#" className="hover:underline">SIGN IN</a>
              <span>|</span>
              <a href="#" className="hover:underline">REGISTER</a>
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
    </nav>
  );
};

export default UpperNavbar;