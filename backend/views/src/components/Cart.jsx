import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Latest N-5 Perfume",
      price: 15.0,
      quantity: 1,
      img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
    },
    {
      id: 2,
      name: "Musk Rose Couper",
      price: 15.0,
      quantity: 1,
      img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
    },
    {
      id: 3,
      name: "Dusk Dark Hue",
      price: 15.0,
      quantity: 1,
      img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Shopping Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600 text-lg">
                <th className="pb-4 w-1/3">Product</th>
                <th className="pb-4 w-1/6">Price</th>
                <th className="pb-4 w-1/6">Quantity</th>
                <th className="pb-4 w-1/6">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 text-gray-800 text-lg">
                  <td className="py-6 flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-lg" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-6 font-semibold text-center">${item.price.toFixed(2)}</td>
                  <td className="py-6 flex items-center justify-center space-x-3">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="py-6 font-semibold text-center">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Summary</h3>
          <div className="text-lg space-y-4">
            <p className="flex justify-between">
              <span>Sub Total</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (18%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </p>
            <hr className="my-4 border-gray-300" />
            <p className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-gray-800">${total.toFixed(2)}</span>
            </p>
          </div>
          <div className="mt-6 flex flex-col space-y-3">
            <button className="bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-300">
              Add Coupon Code
            </button>
            <button className="bg-gray-800 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-600">
              Continue to Payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;