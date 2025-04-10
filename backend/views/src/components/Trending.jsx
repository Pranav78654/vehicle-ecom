import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const TrendingSection = () => {
  const [trendingCars, setTrendingCars] = useState([]);

  // Manually chosen car IDs
  const trendingCarIds = [1, 2, 3, 2, 1];

  useEffect(() => {
    const fetchTrendingCars = async () => {
      try {
        // Use Promise.all to fetch all cars by ID in parallel
        const carRequests = trendingCarIds.map(id =>
          axios.get(`http://localhost:5000/api/car/${id}`)
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
    <div className="trending-section mt-12 px-6 py-8 bg-[rgba(0,0,0,0.65)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">Trending</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {trendingCars.map((car) => (
          <Card
            key={car.id}
            image={car.imageUrl}
            title={car.carName}         
            year={car.registeredYear}   
            fuel={car.fuel}
            kms={car.kmsDriven}
            price={car.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
