import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import api from '../api/axios'
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "";
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]);

    api
      .get(`/api/car/search?q=${query}&sort=${sort}`)
      .then((res) => setResults(res.data.data || []))
      .catch((err) => {
        console.error("Search error:", err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query, sort]);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", sortValue);
    setSearchParams(newParams);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl">
          Search Results for "<span className="text-yellow-400">{query}</span>"
        </h2>
        <select
          className="px-4 py-2 rounded bg-[#212121] text-white"
          onChange={handleSortChange}
          value={sort}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="year_desc">Newest</option>
          <option value="year_asc">Oldest</option>
          <option value="kms_asc">Kms: Low to High</option>
          <option value="kms_desc">Kms: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-white text-center mt-8">Searching...</p>
      ) : results.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {results.map((car) => (
            <Card
              key={car.id}
              id={car.id}
              image={car.imageUrl}
              title={car.carName}
              year={car.registeredYear}
              fuel={car.fuel}
              kms={car.kmsDriven}
              price={car.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-400 text-lg">No matching cars found.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#831843] text-white rounded-lg hover:bg-[#a21c5a] transition"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
