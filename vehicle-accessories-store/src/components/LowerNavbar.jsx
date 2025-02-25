import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const LowerNavbar = [
  {
    name: 'INTERIOR ACCESSORIES',
    items: [
      { category: 'Comfort & Convenience', items: [
        'Seat Covers (Leather, Fabric, Cooling, Heated)',
        'Steering Wheel Covers',
        'Car Cushions & Neck Pillows',
        'Armrest Consoles & Covers',
        'Dashboard Mats & Covers',
        'Door Sill Protectors',
        'Roof Handles & Hooks',
        'Floor Mats & Carpets',
        'Sun Shades (Front, Side, Rear)',
      ]},
      { category: 'Storage & Organizers', items: [
        'Car Seat & Backseat Organizers',
        'Trunk Organizers',
        'Dashboard Storage Boxes',
        'Cup Holders & Phone Holders',
        'Under-Seat Storage Boxes',
        'Sunglasses Holders',
        'Tissue Box Holders',
      ]},
      { category: 'Electronics & Gadgets', items: [
        'Car Chargers & USB Adapters',
        'Bluetooth FM Transmitters',
        'Android Auto & Apple CarPlay Adapters',
        'Dash Cameras & Reverse Cameras',
        'Head-Up Displays (HUD)',
        'Rear Seat Entertainment Screens',
        'Car Refrigerators & Mini Coolers',
        'Smart Air Purifiers',
      ]},
      { category: 'Aesthetic & Decorative', items: [
        'Interior LED Ambient Lights',
        'Glow-in-the-Dark Stickers',
        'Custom Dashboard Ornaments',
        'Air Fresheners & Perfume Diffusers',
        'Custom Gear Knobs',
        'Chrome & Carbon Fiber Wraps',
      ]},
      { category: 'Safety & Protection', items: [
        'Fire Extinguishers for Cars',
        'First Aid Kits',
        'Anti-Theft Steering Locks',
        'Seat Belt Cushions & Adjusters',
        'Baby Car Seats & Booster Seats',
        'Anti-Slip Dashboard Pads',
      ]},
    ],
  },
  {
    name: 'EXTERIOR ACCESSORIES',
    items: [
      { category: 'Protection & Safety', items: [
        'Car Body Covers (Waterproof, UV-Resistant)',
        'Bumper Guards & Protectors',
        'Side Door Protectors',
        'Anti-Scratch Door Edge Guards',
        'Mud Flaps & Splash Guards',
        'Window Rain Visors',
        'Headlight & Taillight Protective Films',
        'Windshield Covers (Sunshade, Frost Protection)',
      ]},
      { category: 'Aesthetic & Customization', items: [
        'Alloy Wheels & Rim Covers',
        'Chrome Trim Accessories (Grille, Door Handles, Side Mirrors)',
        'Custom Wraps & Decals',
        'Racing Stripes & Stickers',
        'Spoilers & Roof Rails',
        'LED Underbody Lights (Neon, RGB)',
        'Custom Badges & Emblems',
      ]},
      { category: 'Lighting & Visibility', items: [
        'LED Headlights & Fog Lights',
        'DRL (Daytime Running Lights)',
        'Underbody & Grille LED Lights',
        'Rear Brake & Indicator LED Strips',
        'Side Mirror Indicators',
        'Reflective Stickers & Strips',
      ]},
      { category: 'Utility & Performance', items: [
        'Roof Racks & Cargo Carriers',
        'Bike Racks & Mounts',
        'Towing Hooks & Winches',
        'Side Steps & Running Boards',
        'Off-Road Skid Plates',
        'Exhaust Pipe Modifications (Chrome Tips, Sound Enhancers)',
      ]},
      { category: 'Exterior Gadgets & Accessories', items: [
        'Car Door Projector Lights (Logo Projection)',
        'Automatic Side Mirror Closers',
        'Smart Car Covers (Automatic Folding)',
        'Rearview Camera & Parking Sensors',
        'Keyless Entry & Remote Starters',
        'Car Horns & Sirens (Custom Sounds)',
      ]},
    ],
  },
  {
    name: 'UTILITY ACCESSORIES',
    items: [
      { category: 'Storage & Cargo Management', items: [
        'Roof Racks & Roof Boxes (Hard Shell, Soft Bag)',
        'Trunk Organizers (Collapsible, Waterproof)',
        'Foldable Cargo Baskets',
        'Under-Seat Storage Boxes',
      ]},
      { category: 'Towing & Off-Road Accessories', items: [
        'Tow Hooks & Hitch Receivers',
        'Winches & Recovery Straps',
        'Off-Road Jack & Mounts',
        'Snorkel Kits (For Water & Dust Protection)',
        'Sand Ladders & Traction Mats',
      ]},
      { category: 'Convenience & Practical Accessories', items: [
        'Portable Air Compressors & Tire Inflators',
        'Battery Jump Starters & Booster Cables',
        'Collapsible Water Tanks',
        'Retractable Awnings & Side Tents',
      ]},
      { category: 'Parking & Security', items: [
        'Car Wheel Locks & Anti-Theft Tire Clamps',
        'Reverse Cameras & Parking Sensors',
        'Keyless Entry & Remote Start Systems',
        'GPS Vehicle Trackers',
      ]},
    ],
  },
  {
    name: 'SPARE PARTS',
    items: [
      'Engine Oils & Lubricants',
      'Air & Oil Filters',
      'Brake Pads & Rotors',
      'Clutch Plates',
      'Radiators & Coolants',
      'Wiper Blades',
      'Belts & Hoses',
      'Spark Plugs & Ignition Coils',
      'Car Batteries',
    ],
  },
  {
    name: 'SECURITY & SAFETY',
    items: [
      'GPS Trackers',
      'Dash Cameras',
      'Parking Sensors',
      'Car Alarm Systems',
      'Steering & Gear Locks',
      'Child Safety Locks',
      'Fire Extinguishers',
      'Emergency Escape Tools',
    ],
  },
  {
    name: 'CLEANING & CARE',
    items: [
      'Car Wash Shampoos & Foam Cleaners',
      'Microfiber Cloths & Sponges',
      'Wax & Polish Kits',
      'Interior Cleaning Sprays',
      'Tire & Alloy Wheel Cleaners',
      'Leather Seat Conditioners',
      'Glass Cleaners & Anti-Fog Solutions',
    ],
  },
  {
    name: 'LIGHTS & ELECTRONICS',
    items: [
      'LED & HID Headlights',
      'Fog Lamps & Auxiliary Lights',
      'Interior Ambient Lights',
      'DRL (Daytime Running Lights)',
      'Underbody Neon Lights',
      'Bluetooth FM Transmitters',
      'Reverse Camera Kits',
      'Car Horns & Sound Systems',
    ],
  },
  {
    name: 'TWO-WHEELER ACCESSORIES',
    items: [
      { category: 'Protection & Security', items: [
        'Helmet Locks & Covers',
        'Bike Body Covers',
        'Anti-Theft Alarms',
      ]},
      { category: 'Utility & Performance', items: [
        'Saddlebags & Tank Bags',
        'Mobile Holders & Chargers',
        'Crash Guards & Engine Protectors',
        'Bike Stand & Paddock Stands',
        'LED Headlights & Tail Lights',
        'Air Pressure Gauges',
      ]},
      { category: 'Cleaning & Maintenance', items: [
        'Chain Cleaners & Lubricants',
        'Polishing Kits',
        'Seat Covers & Handle Grips',
      ]},
      { category: 'Riding Gear & Accessories', items: [
        'Riding Gloves & Knee Guards',
        'Rain Suits & Wind Cheaters',
        'Hydration Packs & Travel Kits',
      ]},
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-md">
      <div className="max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          <div className="flex space-x-4">
            {LowerNavbar.map((item) => (
              <Menu
                as="div"
                className="relative"
                key={item.name}
                onMouseEnter={() => setOpenMenu(item.name)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div>
                  <Menu.Button className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xs font-medium cursor-pointer">
                    {item.name}
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </Menu.Button>
                </div>
                {openMenu === item.name && item.items && (
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="max-h-96 overflow-y-auto p-4 custom-scrollbar">
                        {Array.isArray(item.items) && item.items.length > 0 && typeof item.items[0] === 'object' ? (
                          item.items.map((category, catIndex) => (
                            <div key={category.category || catIndex} className="mb-2">
                              {category.category && (
                                <h3 className="font-semibold text-gray-800 text-sm">{category.category}</h3>
                              )}
                              <ul className="mt-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subItem || subIndex} className="text-gray-700 hover:bg-gray-200 hover:font-semibold px-2 py-1 rounded transition duration-200 cursor-pointer">
                                    {subItem}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <ul>
                            {item.items.map((subItem, subIndex) => (
                              <li key={subItem || subIndex} className="text-gray-700 hover:bg-gray-200 hover:font-semibold px-2 py-1 rounded transition duration-200 cursor-pointer">
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                )}
              </Menu>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </Disclosure>
  );
}
