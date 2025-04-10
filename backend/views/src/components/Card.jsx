import React from 'react';
import '../css/card.css'; // Optional

function Card({ image, title, year, fuel, kms, price }) {
  return (
    <div className="bg-[rgba(0,0,0)] text-white rounded-lg shadow-lg p-4 w-[270px] h-[400px] flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <img
            alt={title}
            src={image}
            className="rounded-lg w-full h-[200px] object-cover"
          />
        </div>

        <h2 className="text-lg font-bold text-center mb-2 truncate" title={title}>
          {title}
        </h2>

        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-sm">Registered</p>
            <p className="font-bold">{year}</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Fuel</p>
            <p className="font-bold">{fuel}</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Kms</p>
            <p className="font-bold">{kms}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800 bg-[#f59e0b] py-2 rounded-lg">
          ₹ {price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}

export default Card;
