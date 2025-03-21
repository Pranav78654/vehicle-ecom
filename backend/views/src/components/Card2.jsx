import React, { useState } from "react";

const categories = [
  "CAR BODY COVERS",
  "SUN SHADES",
  "SEAT COVERS",
  "UNIVERSAL FIT",
];

const productsData = {
  "CAR BODY COVERS": [
    {
      id: 1,
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
      discount: "60% OFF",
      name: "KINGSWAY® Syros Car Body Cover",
      year: "2025",
      price: null,
      originalPrice: null,
      soldOut: true,
    },
    {
      id: 2,
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
      discount: "61% OFF",
      name: "KINGSWAY® Seal Car Body Cover",
      year: "2024",
      price: null,
      originalPrice: null,
      soldOut: true,
    },
  ],
  "SUN SHADES": [
    {
      id: 3,
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
      discount: "50% OFF",
      name: "Premium Sun Shade Set",
      year: "2025",
      price: "Rs. 599.00",
      originalPrice: "Rs. 1,199.00",
      soldOut: false,
    },
  ],
  "SEAT COVERS": [
    {
      id: 4,
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
      discount: "50% OFF",
      name: "Luxurious Leather Seat Covers for Comfortable Driving Experience",
      year: "2025",
      price: "Rs. 1,299.00",
      originalPrice: "Rs. 2,499.00",
      soldOut: false,
    },
  ],
  "UNIVERSAL FIT": [
    {
      id: 5,
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480",
      discount: "50% OFF",
      name: "Universal Fit Car Accessories Pack",
      year: "2025",
      price: "Rs. 899.00",
      originalPrice: "Rs. 1,799.00",
      soldOut: false,
    },
  ],
};

const Card2 = () => {
  const [activeCategory, setActiveCategory] = useState("CAR BODY COVERS");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between border-b border-red-200 pb-2">
        <h2 className="text-2xl font-light text-gray-600 whitespace-nowrap">
          TOP-SELLING <span className="font-bold text-blue-600">PRODUCTS</span>
        </h2>

        <div className="flex gap-6 ml-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-sm font-medium ${
                activeCategory === category
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-red-400"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 mt-4 overflow-hidden">
        {productsData[activeCategory].map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg 
                      w-64 h-[360px] p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* ✅ Discount Label */}
            <span
              className="absolute top-2 left-2 z-10 bg-red-500 bg-opacity-90 text-white 
                         text-xs font-semibold px-2 py-1 rounded-md shadow-md"
            >
              {product.discount}
            </span>

            {/* Product Image */}
            <div className="relative h-40 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover rounded-md"
              />
            </div>

            {/* Product Details (Fixed Height Section) */}
            <div className="p-2 flex flex-col flex-grow justify-between">
              <div>
                <p className="text-xs text-red-500">KINGSWAY</p>
                <h3 className="text-sm font-semibold text-gray-700 line-clamp-2">
                  {product.name} ({product.year} Onwards)
                </h3>
              </div>

              <div className="mt-2">
                {product.soldOut ? (
                  <div className="text-center text-gray-500 text-sm font-semibold">
                    Sold Out
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-cyan-600 text-base font-semibold">
                      {product.price}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      {product.originalPrice}
                    </p>
                  </div>
                )}
              </div>

              {/* ✅ Button (Styled for Both "Sold Out" & "Add to Cart") */}
              <button
                className={`rounded-md w-full mt-3 py-1.5 px-3 border border-transparent text-center text-xs 
                             transition-all shadow-md hover:shadow-lg 
                             ${product.soldOut 
                               ? "bg-gray-400 text-white cursor-not-allowed" 
                               : "bg-cyan-600 text-white hover:bg-cyan-700 focus:bg-gray-800 active:bg-cyan-700"}
                            `}
                type="button"
                disabled={product.soldOut}
              >
                {product.soldOut ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card2;