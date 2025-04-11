import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 text-white"
    style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>

      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-4">
          {["About", "Blog", "Jobs", "Press", "Accessibility", "Partners"].map((link, index) => (
            <a key={index} href="#" className="hover:text-gray-300">
              {link}
            </a>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {["facebook", "instagram", "twitter", "github", "youtube"].map((icon, index) => (
            <a key={index} href="#" className="hover:text-gray-300">
              <i className={`fab fa-${icon} fa-lg`}></i>
            </a>
          ))}
        </div>
        <p className="text-sm">&copy; 2024 Your Company, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;