import React, { useState } from "react";

const LowerNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleClick = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const menuItems = {
    "Internal Accessories": [
      "Seat Covers",
      "Steering Wheel Covers",
      "Dashboard Covers",
      "Car Floor Mats",
      "Sunshades",
      "Armrests",
      "Interior Lighting",
      "Mobile Holders & Chargers",
      "Extra Item 1",
      "Extra Item 2",
      "Extra Item 3",
    ],
    "External Accessories": [
      "Car Covers",
      "Body Covers for Two-Wheelers",
      "Bumpers & Bumper Guards",
      "Roof Rails & Roof Carriers",
      "Spoilers",
      "Door Visors & Wind Deflectors",
      "Side Foot Steps",
      "Extra Item 1",
      "Extra Item 2",
    ],
    "Utility Accessories": [
      "Luggage Racks",
      "Tool Kits",
      "Car Organizers & Storage Solutions",
      "Phone & Tablet Holders",
      "Cup Holders",
      "Multipurpose Hooks",
      "Extra Item 1",
      "Extra Item 2",
    ],
    "Spare Parts": [
      "Brake Pads & Discs",
      "Clutch & Gear Components",
      "Engine Oils & Lubricants",
      "Filters (Oil, Air, Fuel)",
      "Wipers & Blades",
      "Suspension & Steering Parts",
      "Extra Item 1",
      "Extra Item 2",
      "Extra Item 3",
    ],
    "Security and Safety": [
      "Car Alarms & Immobilizers",
      "GPS Trackers",
      "Rear & Front Parking Sensors",
      "Dash Cams",
      "Seat Belt Pads & Extenders",
      "Fire Extinguishers",
      "First Aid Kits",
      "Anti-Theft Wheel Locks",
    ],
    "Cleaning and Care": [
      "Car Shampoo & Wax",
      "Microfiber Towels",
      "Dashboard & Leather Polish",
      "Glass Cleaners",
      "Car Vacuum Cleaners",
      "Tyre Cleaners & Dressers",
      "Rust Removers",
    ],
    "Lights and Electronic": [
      "LED Headlights",
      "Fog Lamps",
      "Tail Lights",
      "Interior LED Strips",
      "Underbody Lighting",
      "Number Plate Lights",
      "Extra Item 1",
      "Extra Item 2",
    ],
    "Two Wheeler Accessories": [
      "Bike Covers",
      "Handlebar Grips",
      "Riding Gloves",
      "Side Boxes & Saddlebags",
      "Helmet Locks",
      "LED Indicator Lights",
      "Extra Item 1",
      "Extra Item 2",
    ],
  };

  return (
    <nav className="bg-gray-800 py-5 shadow-lg relative z-50">
      <ul className="flex justify-center space-x-10 px-10 text-gray-200 text-sm font-semibold uppercase relative">
        {Object.keys(menuItems).map((menu, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => handleClick(menu)}
              className="hover:text-gray-400 flex items-center gap-1"
            >
              {menu} ⮟
            </button>
            {openDropdown === menu && (
              <ul
                className="absolute left-0 mt-2 w-56 bg-gray-700 shadow-md rounded-md text-sm z-50 border border-gray-600"
                onMouseEnter={() => setOpenDropdown(menu)}
                onMouseLeave={handleMouseLeave}
                style={{
                  maxHeight: "250px", // Fixed height
                  overflowY: "auto", // Enable scroll inside
                  scrollbarWidth: "none", // Hide scrollbar (Firefox)
                  msOverflowStyle: "none", // Hide scrollbar (IE/Edge)
                }}
              >
                <style>
                  {`
                    /* Hide scrollbar for WebKit browsers */
                    ::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>
                {menuItems[menu].map((item, idx) => (
                  <li
                    key={idx}
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
        ))}
      </ul>
    </nav>
  );
};

export default LowerNavbar;
