import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
    state: "",
  });
  const [saveCard, setSaveCard] = useState(null);
  const [touched, setTouched] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(`F${Date.now()}`);

  // ✅ Show toast if redirected with failure
  useEffect(() => {
    if (location.state?.paymentFailed) {
      toast.error("Payment Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "expiry") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length >= 3) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isValidCardNumber = /^[0-9]{16}$/.test(formData.cardNumber);
  const isValidName = formData.name.trim().length > 0;

  const isValidExpiry = (() => {
    const match = formData.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const inputMonth = parseInt(match[1], 10);
    const inputYear = parseInt(match[2], 10);
    return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
  })();

  const isValidCVV = /^[0-9]{3,4}$/.test(formData.cvv);
  const isValidState = formData.state.trim().length > 0;

  const isFormValid =
    selectedMethod === "card" &&
    isValidCardNumber &&
    isValidName &&
    isValidExpiry &&
    isValidCVV &&
    isValidState;

  const handlePlaceOrder = () => {
    if (isFormValid) {
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white px-4">
        <motion.div
          className="bg-[#1e1e1e] max-w-md w-full p-8 rounded-lg shadow-lg text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-flat-success-payment-icon-with-approved-money-vector-vector-png-image_47107438.jpg"
            alt="Success"
            className="mx-auto mb-4 w-[350px] h-[150px] object-contain rounded-xl"
          />
          <p className="text-sm text-gray-400 mb-1">Order number {orderNumber}</p>
          <h2 className="text-2xl font-bold mb-2">Thanks for your order!</h2>
          <div className="flex justify-center gap-4">
          <button
              onClick={() => navigate("/")} // 👈 navigate on click
              className="bg-transparent border border-gray-400 px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white text-sm text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row pt-6">
        {/* Left Section */}
        <motion.div
          className="w-full md:w-2/3 px-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="font-semibold mb-4 text-lg">CHECKOUT</h2>
          <hr className="border-blue-500 mb-6" />

          {/* Credit/Debit Card Form */}
          <div className="bg-gray-50 border border-gray-200 shadow rounded px-6 py-5 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://img.icons8.com/ios-filled/32/000000/bank-card-front-side.png"
                alt="card"
              />
              <span className="text-base font-semibold">
                Credit Card / Debit Card
              </span>
            </div>

            <motion.div
              className="space-y-4 text-sm text-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[{ label: "Card Number *", name: "cardNumber", placeholder: "XXXX XXXX XXXX XXXX", isValid: isValidCardNumber },
              { label: "Name on Card *", name: "name", placeholder: "John Doe", isValid: isValidName }].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className={`w-full border px-4 py-2 rounded-md transition-all duration-200 focus:outline-none text-sm focus:ring-2 ${touched[field.name] && !field.isValid
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 focus:ring-blue-400"
                      }`}
                  />
                </div>
              ))}

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-medium mb-1">Expiration *</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full border px-4 py-2 rounded-md transition-all duration-200 focus:outline-none text-sm ${touched.expiry && !isValidExpiry
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 focus:ring-blue-400"
                      }`}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium mb-1">CVV *</label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="***"
                    className={`w-full border px-4 py-2 rounded-md transition-all duration-200 focus:outline-none text-sm ${touched.cvv && !isValidCVV
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 focus:ring-blue-400"
                      }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full border px-4 py-2 rounded-md transition-all duration-200 focus:outline-none text-sm ${touched.state && !isValidState
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                    }`}
                >
                  <option value="">Select State</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              {/* Save payment method section */}
              <div className="pt-4 border-t border-gray-300">
                <p className="font-semibold text-sm mb-2">*Required: Save this payment method for future purchases?</p>
                <div className="flex gap-6 mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="saveCard"
                      value="yes"
                      checked={saveCard === "yes"}
                      onChange={() => setSaveCard("yes")}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="saveCard"
                      value="no"
                      checked={saveCard === "no"}
                      onChange={() => setSaveCard("no")}
                    />
                    No
                  </label>
                </div>
                <p className="text-xs text-gray-600">
                  By choosing to save your payment information, this payment method will be selected as the default for all purchases made using name payment.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full md:w-1/3 px-4 mt-8 md:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white shadow rounded border border-gray-200 p-4">
            <h2 className="text-sm font-semibold mb-4">ORDER SUMMARY</h2>
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgXtVkoV1M3dqW7W8tSHLE4_geGz_3QySXWQ&s"
                alt="game"
                className="h-16 w-16 object-cover rounded"
              />
              <div>
                <p className="font-bold">Assassin’s Creed Shadows</p>
                <p className="text-xs text-gray-600">Ubisoft Entertainment</p>
                <p className="font-semibold mt-1">₹4,899.00</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p className="flex justify-between">
                <span>Price</span> <span>₹4,899.00</span>
              </p>
              <p className="flex justify-between">
                <span>GST included (28%)</span> <span>₹747.31</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-bold text-base">
                <span>Total</span> <span>₹4,899.00</span>
              </p>
            </div>
            <motion.button
              disabled={!isFormValid}
              onClick={handlePlaceOrder}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 mt-4 rounded-md font-semibold transition-all duration-200 text-sm ${isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              PLACE ORDER
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
