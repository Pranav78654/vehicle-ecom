import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const AddToCartButton = ({ carId, carData }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const isInCart = cartItems.some((item) => item.id === carId);

  const handleAddToCart = () => {
    if (!isInCart && carData) {
      console.log('Trying to add to cart:', carData); // 🛑 ADD THIS LINE
      dispatch(addToCart(carData)); // just carData, not { ...carData }
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isInCart}
      className={`${
        isInCart ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
      } text-white w-full py-2 rounded-lg mb-4`}
    >
      {isInCart ? 'Added to Cart' : 'Add To Cart'}
    </button>
  );
};

export default AddToCartButton;
