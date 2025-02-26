import React from "react";
import { Menu } from "@headlessui/react";
import carimage from "../assets/carimage.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const VehicleSelection = () => {
  return (
    <div className="w-full">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          alt="A red car on a road with mountains in the background"
          className="absolute inset-0 w-full h-full object-cover blur-[2.5px]"
          src={carimage}
        />
        <div className="absolute inset-0 bg-opacity-75 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            SELECT YOUR VEHICLE
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white">
            Over 100,000 Car and Bike Accessories
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            
            {/* Vehicle Brand Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="bg-white text-gray-900 py-2 px-4 rounded-md">
                Select Vehicle Brand
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Toyota
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Honda
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Ford
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            {/* Model Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="bg-white text-gray-900 py-2 px-4 rounded-md">
                Select Model
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Model A
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Model B
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Model C
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            {/* Year Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="bg-white text-gray-900 py-2 px-4 rounded-md">
                Select Year
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-28 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      2024
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      2023
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      2022
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <button className="bg-red-600 text-white py-2 px-6 rounded-md">
              SEARCH
            </button>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md">
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
