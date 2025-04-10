import React from "react";

const PaymentPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Section - Address & Payment Options */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Delivering to Name</h2>
            <p className="text-sm text-gray-600">
              Address
            </p>
            <button className="text-blue-600 mt-2 text-sm hover:underline">Add delivery instructions</button>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Payment method</h2>

            {/* Credit & Debit Cards */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">CREDIT & DEBIT CARDS</h3>
              <div className="border p-4 rounded bg-orange-50 flex items-center justify-between">
                <div>
                  <input type="radio" name="card" defaultChecked className="mr-2" />
                  <span className="font-medium">Credit Card</span> 
                  <p className="text-sm text-gray-600">CVV not needed <span className="text-blue-600 cursor-pointer">Why?</span></p>
                </div>
                <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="card" className="h-6" />
              </div>
            </div>

            {/* UPI */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">UPI</h3>
              <label className="flex items-center gap-2">
                <input type="radio" name="card" className="accent-yellow-400" />
                <span>Amazon Pay UPI</span>
                <img src="https://img.icons8.com/color/32/000000/bank.png" alt="bank" />
              </label>
            </div>

            {/* Other Payment Method */}
            <div>
              <h3 className="font-semibold mb-2">Another payment method</h3>
              <label className="flex items-center gap-2">
                <input type="radio" name="card" />
                <span>Credit or debit card</span>
                <div className="flex gap-1 ml-2">
                  <img src="https://img.icons8.com/color/32/000000/visa.png" />
                  <img src="https://img.icons8.com/color/32/000000/mastercard-logo.png" />
                  <img src="https://img.icons8.com/color/32/000000/amex.png" />
                  <img src="https://img.icons8.com/color/32/000000/rupay.png" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <button className="bg-yellow-400 hover:bg-yellow-300 w-full py-2 rounded text-sm font-semibold">
              Use this payment method
            </button>

            <div className="mt-6 text-sm text-gray-700">
              <p>Items: --</p>
              <p>Delivery: --</p>
              <p className="font-bold text-lg mt-2">Order Total: ₹498.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
