import React from "react";
import carimage from "../assets/carimage.jpg";

const VehicleSelection = () => {
  return (
    <div className="w-full "> 
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          alt="A red car on a road with mountains in the background"
          className="absolute inset-0 w-full h-full object-cover blur-[2.5px]"
          src={carimage}
        />
        <div className="absolute inset-0 bg-opacity-75 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">SELECT YOUR VEHICLE</h1>
          <p className="text-lg md:text-xl mb-6 text-white">Over 100,000 Car and Bike Accessories</p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <select className="bg-white text-gray-900 py-2 px-4 rounded-md w-64 md:w-auto">
              <option>Select Vehicle Brand</option>
            </select>
            <select className="bg-white text-gray-900 py-2 px-4 rounded-md w-64 md:w-auto">
              <option>Select Model</option>
            </select>
            <select className="bg-white text-gray-900 py-2 px-4 rounded-md w-64 md:w-auto">
              <option>Select Year</option>
            </select>
            <button className="bg-red-600 text-white py-2 px-6 rounded-md">SEARCH</button>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md">RESET</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
