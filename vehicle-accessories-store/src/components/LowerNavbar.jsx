import React, { useState } from "react";

const LowerNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleClick = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMouseLeave = (menu) => {
    if (openDropdown === menu) {
      setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
    }
  };

  return (
    <nav className="bg-gray-800 py-5 shadow-lg relative z-50">
      <ul className="flex justify-center space-x-10 text-gray-200 text-base font-semibold uppercase relative">
        {/* Interior Accessories Dropdown */}
        <li className="relative">
          <button
            onClick={() => handleClick("interior")}
            className="hover:text-gray-400 flex items-center"
          >
            Interior Accessories ⮟
          </button>
          {openDropdown === "interior" && (
            <ul
              className="absolute left-0 mt-2 w-56 bg-gray-700 shadow-md rounded-md text-sm z-50 border border-gray-600"
              onMouseEnter={() => setOpenDropdown("interior")}
              onMouseLeave={() => handleMouseLeave("interior")}
            >
              {[
                "Seat Covers",
                "Steering Wheel Covers",
                "Dashboard Covers",
                "Car Floor Mats",
                "Sunshades",
                "Armrests",
                "Interior Lighting",
                "Mobile Holders & Chargers",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-opacity duration-200 ${
                    hoveredItem === item ? "opacity-100" : "opacity-60"
                  } hover:opacity-100 hover:bg-gray-600`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Exterior Accessories Dropdown */}
        <li className="relative">
          <button
            onClick={() => handleClick("exterior")}
            className="hover:text-gray-400 flex items-center"
          >
            Exterior Accessories ⮟
          </button>
          {openDropdown === "exterior" && (
            <ul
              className="absolute left-0 mt-2 w-56 bg-gray-700 shadow-md rounded-md text-sm z-50 border border-gray-600"
              onMouseEnter={() => setOpenDropdown("exterior")}
              onMouseLeave={() => handleMouseLeave("exterior")}
            >
              {[
                "Car Covers",
                "Body Covers for Two-Wheelers",
                "Bumpers & Bumper Guards",
                "Roof Rails & Roof Carriers",
                "Spoilers",
                "Door Visors & Wind Deflectors",
                "Side Foot Steps",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-opacity duration-200 ${
                    hoveredItem === item ? "opacity-100" : "opacity-60"
                  } hover:opacity-100 hover:bg-gray-600`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Utility Accessories Dropdown */}
        <li className="relative">
          <button
            onClick={() => handleClick("utility")}
            className="hover:text-gray-400 flex items-center"
          >
            Utility Accessories ⮟
          </button>
          {openDropdown === "utility" && (
            <ul
              className="absolute left-0 mt-2 w-56 bg-gray-700 shadow-md rounded-md text-sm z-50 border border-gray-600"
              onMouseEnter={() => setOpenDropdown("utility")}
              onMouseLeave={() => handleMouseLeave("utility")}
            >
              {[
                "Luggage Racks",
                "Tool Kits",
                "Car Organizers & Storage Solutions",
                "Phone & Tablet Holders",
                "Cup Holders",
                "Multipurpose Hooks",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-opacity duration-200 ${
                    hoveredItem === item ? "opacity-100" : "opacity-60"
                  } hover:opacity-100 hover:bg-gray-600`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Other Menu Items Without Dropdowns Yet */}
        {[
          "Spare Parts",
          "Security & Safety",
          "Cleaning & Care",
          "Lights & Electronics",
          "Two-Wheeler Accessories",
        ].map((menu, index) => (
          <li className="relative" key={index}>
            <button
              onClick={() => handleClick(menu)}
              className="hover:text-gray-400 flex items-center"
            >
              {menu} ⮟
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LowerNavbar;
