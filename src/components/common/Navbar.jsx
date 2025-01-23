import React from "react";
import { FiMenu, FiSun, FiMoon, FiLogOut } from "react-icons/fi";

const Navbar = ({ toggleSidebar, toggleTheme, isDarkMode, handleLogout }) => {
  return (
    <nav className="w-full h-16 bg-orange-500">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg text-white hover:bg-orange-600"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg text-white hover:bg-orange-600"
          >
            {isDarkMode ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
          </button>
          <div className="px-4">
            <p className="font-medium text-white">SAER MBOW</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="p-2 rounded-lg text-white hover:bg-orange-600"
          >
            <FiLogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;