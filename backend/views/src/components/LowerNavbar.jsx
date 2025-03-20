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
    ],
    "External Accessories": [
      "Car Covers",
      "Body Covers for Two-Wheelers",
      "Bumpers & Bumper Guards",
      "Roof Rails & Roof Carriers",
      "Spoilers",
      "Door Visors & Wind Deflectors",
      "Side Foot Steps",
    ],
    "Utility Accessories": [
      "Luggage Racks",
      "Tool Kits",
      "Car Organizers & Storage Solutions",
      "Phone & Tablet Holders",
      "Cup Holders",
      "Multipurpose Hooks",
    ],
    "Spare Parts": [
      "Brake Pads & Discs",
      "Clutch & Gear Components",
      "Engine Oils & Lubricants",
      "Filters (Oil, Air, Fuel)",
      "Wipers & Blades",
      "Suspension & Steering Parts",
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
    ],
    "Two Wheeler Accessories": [
      "Bike Covers",
      "Handlebar Grips",
      "Riding Gloves",
      "Side Boxes & Saddlebags",
      "Helmet Locks",
      "LED Indicator Lights",
    ],
  };

  return (
    <nav 
    className="sticky top-0 py-5 shadow-lg z-50"
    style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>


      <ul className="flex justify-center space-x-10 px-10 text-gray-200 text-sm font-semibold uppercase relative">
        {Object.keys(menuItems).map((menu, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => handleClick(menu)}
              className="hover:text-gray-400 flex items-center gap-1"
            >
              {menu}
            </button>
            {openDropdown === menu && (
              <ul
                className="absolute left-0 mt-2 w-56  shadow-md rounded-md text-sm z-50 border border-white-600 overflow-hidden"
                
                onMouseEnter={() => setOpenDropdown(menu)}
                onMouseLeave={handleMouseLeave}
                style={{
                  maxHeight: "250px", // Fixed height
                  overflowY: "auto", // Allows scrolling if content is too long
                backgroundColor: 'rgba(0,0,0,0.65)' 
                }}
              >
                {/* ✅ Removed scrollbar hiding styles to keep default browser scrollbar */}
                <div>
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
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LowerNavbar;
