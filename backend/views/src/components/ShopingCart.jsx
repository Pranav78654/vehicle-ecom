import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from 'lucide-react';
import axios from 'axios';

const ShopingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Split Fiction",
      price: 2499,
      quantity: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgXtVkoV1M3dqW7W8tSHLE4_geGz_3QySXWQ&s",
    },
    {
      id: 2,
      name: "Phantom Rift",
      price: 1899,
      quantity: 1,
      img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg",
    },
    {
      id: 3,
      name: "Phantom Rift",
      price: 1899,
      quantity: 1,
      img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
    },
    {
      id: 4,
      name: "Phantom Rift",
      price: 1899,
      quantity: 1,
      img: "https://www.carpro.com/hs-fs/hubfs/2023-Chevrolet-Corvette-Z06-credit-chevrolet.jpeg?width=1020&name=2023-Chevrolet-Corvette-Z06-credit-chevrolet.jpeg"
    },
    {
      id: 5,
      name: "Phantom Rift",
      price: 1899,
      quantity: 1,
      img: "https://hips.hearstapps.com/hmg-prod/images/2-spectre-unveiled-the-first-fully-electric-rolls-royce-front-3-4-1666037303.jpg?crop=0.845xw:1.00xh;0.0714xw,0&resize=980:*",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = async (carId, quantity = 1) => {
    try {
      // Add the item to the backend cart
      await axios.post(`/api/cart/${userId}/add`, { carId, quantity });

      // Optionally, update the state immediately after adding
      setCartItems((prevItems) => [...prevItems, { carId, quantity }]);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;


  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-md px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto bg-blue-700/5 backdrop-blur-2xl p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-10">My Cart</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-transparent p-6 rounded-lg shadow-md">
            <AnimatePresence>
              {Array.isArray(cartItems) && cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col lg:flex-row gap-4 pb-6 mb-6 bg-[#212121] rounded-lg p-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full lg:w-40 h-28 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-1 justify-between relative">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xl font-bold">{item.name}</div>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className={`px-3 py-1 rounded-lg transition-colors ${
                              item.quantity === 1
                                ? "bg-gray-700 cursor-not-allowed opacity-50"
                                : "bg-[#831843] hover:bg-[#6e1236] cursor-pointer"
                            }`}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 bg-[#831843] hover:bg-[#6e1236] rounded-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-400 mt-1">
                        {item.brand}, {item.type}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold">₹{item.price}</div>
                    </div>

                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>


            {cartItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center text-gray-400 mt-20"
              >
                <div className="text-3xl font-bold mb-2">Your cart is empty</div>
                <div className="text-lg italic mb-4">Looks like you haven’t added anything yet</div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5.6a1 1 0 001 1.4h12a1 1 0 001-1.4L17 13M7 13h10"
                    />
                  </svg>
                </div>
              </motion.div>
            )}

            {cartItems.length > 0 && (
              <button
                onClick={() => setCartItems([])}
                className="w-full mt-4 bg-[#831843] hover:bg-[#6e1236] text-white font-bold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 h-fit mt-6 lg:mt-6 bg-[#212121] backdrop-blur-md p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-gray-400">Calculated at Checkout</span>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/Payment", { state: { cartItems } })}
              className="w-full mt-8 bg-[#831843] hover:bg-[#6e1236] text-white font-bold py-3 rounded-lg transition-colors cursor-pointer"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopingCart;
