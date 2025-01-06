// src/components/Navbar.jsx
import React from "react";
import { FiMenu, FiSun, FiMoon, FiLogOut } from "react-icons/fi";

const Navbar = ({ toggleSidebar, toggleTheme, isDarkMode, handleLogout }) => {
  return (
    <header className="flex justify-between items-center bg-orange-500 text-white px-6 py-4 shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">
        <FiMenu />
      </button>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-2xl">
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span>N</span>
          </div>
          <span>Nene Ba</span>
        </div>
        <button onClick={handleLogout} className="text-2xl">
          <FiLogOut />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
