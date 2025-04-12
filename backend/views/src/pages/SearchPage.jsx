import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
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

    axios
      .get(`http://localhost:5000/api/car/search?q=${query}`)
      .then((res) => setResults(res.data.data || []))
      .catch((err) => {
        console.error("Search error:", err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-white text-3xl mb-6">
        Search Results for "<span className="text-yellow-400">{query}</span>"
      </h2>

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
