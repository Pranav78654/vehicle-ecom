import React from 'react';
import '../css/card.css'; // Optional

function Card({ image, title, year, fuel, kms, price }) {
  return (
    <div className="bg-[#212121] text-white rounded-lg shadow-lg p-4 w-[350px] min-w-[270px] h-[500px] flex flex-col items-center gap-4">
      
      {/* Image */}
      <div className="w-full">
        <img
          alt={title}
          src={image}
          className="rounded-lg w-full h-[200px] object-cover"
        />
      </div>

      {/* Title & Specs */}
      <div className="flex flex-col justify-between items-center flex-1 w-full">
        {/* Title */}
        <h2 className="text-lg font-bold text-center break-words px-2 mt-2" title={title}>
          {title}
        </h2>

        {/* Spec Row */}
        <div className="flex justify-between items-center w-full mt-4 px-4 py-2 shadow-inner rounded-md pb-14">
          {/* Registered */}
          <div className="flex-1 text-center border-r border-white/20 pr-4">
            <p className="text-sm mb-1">Registered</p>
            <p className="font-bold">{year}</p>
          </div>
          {/* Fuel */}
          <div className="flex-1 text-center border-r border-white/20 px-4">
            <p className="text-sm mb-1">Fuel</p>
            <p className="font-bold">{fuel}</p>
          </div>
          {/* Kms */}
          <div className="flex-1 text-center pl-4">
            <p className="text-sm mb-1">Kms</p>
            <p className="font-bold">{kms}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-center w-full">
        <p className="text-2xl font-sans text-white bg-[#831843] py-2 rounded-lg shadow-md">
           {price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}

export default Card;