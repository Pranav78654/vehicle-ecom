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
    <Disclosure as="nav" className="bg-gray-800">
      <div className="max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          <div className="flex space-x-4">
            {LowerNavbar.map((item) => (
              <Menu as="div" className="relative" key={item.name}>
                <div>
                  <MenuButton className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    {item.name}
                  </MenuButton>
                </div>
                <Menu.Items
                  className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Option 1
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Option 2
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Option 3
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}