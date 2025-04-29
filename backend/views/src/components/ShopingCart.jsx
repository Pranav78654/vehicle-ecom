import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../store/cartSlice"; // make sure you have clearCart reducer

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const updateQuantity = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity < 1) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(addToCart({ ...item, quantity: change })); // <== only change, not total quantity
      }
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-md px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto bg-blue-700/5 backdrop-blur-2xl p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-10">My Cart</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1 bg-transparent p-6 rounded-lg shadow-md">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col lg:flex-row gap-4 pb-6 mb-6 bg-[#212121] rounded-lg p-4"
                >
                  <img
                    src={item.img || "https://placehold.co/300x200?text=No+Image"}
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
                        {item.brand || 'Unknown Brand'}, {item.type || 'Unknown Type'}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold">₹{(item.price || 0).toLocaleString("en-IN")}</div>
                    </div>

                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
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
                onClick={() => dispatch(clearCart())}
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
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-gray-400">Calculated at Checkout</span>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
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

export default ShoppingCart;
