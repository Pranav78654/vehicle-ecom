import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddToCartButton = ({ carId }) => {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/cart/my-cart', { withCredentials: true })
      .then((res) => {
        const isInCart = res.data.cart.some((item) => item.carId === carId);
        setAdded(isInCart);
      })
      .catch(() => setAdded(false))
      .finally(() => setLoading(false));
  }, [carId]);

  const handleAddToCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/validate', {
        withCredentials: true,
      });

      if (!res.data?.isLoggedIn) {
        alert('Please login first to add items to your cart');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/cart/add',
        { carId },
        { withCredentials: true }
      );

      setAdded(true);
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added || loading}
      className={`${
        added ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
      } text-white w-full py-2 rounded-lg mb-4`}
    >
      {loading ? 'Checking...' : added ? 'Added to Cart' : 'Add To Cart'}
    </button>
  );
};

export default AddToCartButton;
