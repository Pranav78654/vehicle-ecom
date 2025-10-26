import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import api from '../api/axios';
const TrendingSection = () => {
  const [trendingCars, setTrendingCars] = useState([]);

  // Manually chosen car IDs
  const trendingCarIds = [1, 6, 3, 4];

  useEffect(() => {
    const fetchTrendingCars = async () => {
      try {
        // Use Promise.all to fetch all cars by ID in parallel
        const carRequests = trendingCarIds.map(id =>
          api.get(`/api/car/${id}`)
        );
        const responses = await Promise.all(carRequests);
        const cars = responses.map(res => res.data);
        setTrendingCars(cars);
      } catch (error) {
        console.error('Failed to fetch trending cars:', error);
      }
    };

    fetchTrendingCars();
  }, []);

  return (
    <div className="trending-section mt-12 px-6 py-8 bg-[#2c2231]/70">
      <div className="flex justify-center mb-6">
        <h2 className="text-white text-4xl font-bold">Trending{"\t"}<span className="text-yellow-500">Cars</span></h2>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide px-6">
  {trendingCars.map((car) => (
      <Card
      key={car.id}
      id={car.id} // ✅ Required for routing
      image={car.imageUrl}
      title={car.carName}
      year={car.registeredYear}
      fuel={car.fuel}
      kms={car.kmsDriven}
      price={"Buy Now"}
    />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
