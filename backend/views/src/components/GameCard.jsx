import React from "react";

function GameCard() {
  return (
    <div className="bg-[#111] text-white p-6 min-h-screen font-sans">
      <h1 className="text-4xl font-bold">The Last of Us™ Part II Remastered</h1>
      <div className="flex items-center gap-4 mt-2 text-sm">
        <span className="text-yellow-400">★★★★★ 4.8</span>
        <span className="text-green-400">🦖 Great Boss Battles</span>
        <span className="text-blue-400">🎭 Amazing Characters</span>
      </div>

      <div className="mt-6">
        <div className="flex gap-8 flex-wrap lg:flex-nowrap">
          {/* Game Preview Section */}
          <div className="flex-1">
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/ss_dad1f0d8882f622c69efbb24a0b72d8dc19a5a1a.jpg"
              alt="Game Preview"
              className="rounded-lg w-full object-cover h-[400px]"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-24 h-16 bg-gray-700 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Purchase Info Section */}
          <div className="w-full lg:w-[300px] bg-[#1e1e1e] p-4 rounded-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/6b/The_Last_of_Us_Part_II_Remastered_cover.jpg"
              alt="Game Logo"
              className="h-24 mx-auto mb-4"
            />
            <span className="text-sm bg-gray-600 text-white px-2 py-1 rounded">
              Base Game
            </span>
            <p className="text-2xl font-semibold mt-2">₹3,299</p>

            <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600">
              Buy Now
            </button>
            <button className="w-full border border-gray-500 text-white py-2 rounded mt-2">
              Add To Cart
            </button>
            <button className="w-full text-white py-2 rounded mt-2">
              Add to Wishlist
            </button>

            <div className="text-sm text-gray-400 mt-4">
              <p>
                <strong>Epic Rewards</strong>: Earn 5% Back
              </p>
              <p>
                <strong>Refund Type</strong>: Self-Refundable
              </p>
              <p className="text-xs mt-2">
                Naughty Dog LLC, Nixxes Software – Publisher: Sony Interactive Entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
