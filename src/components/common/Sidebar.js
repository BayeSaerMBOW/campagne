// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiList, FiSettings } from "react-icons/fi";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-orange-500 text-white h-screen flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-center py-4">
        <img
          src="/image.png" // Chemin corrigé
          alt="Logo"
          className={`rounded-full ${
            isSidebarOpen ? "w-16 h-16" : "w-10 h-10"
          } transition-all duration-300`}
        />
      </div>
      <nav className="flex flex-col space-y-4 mt-8 px-4">
        <Link to="/admin/dashboard" className="flex items-center space-x-3 hover:bg-orange-600 p-2 rounded-md">
          <FiHome size={24} />
          {isSidebarOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/admin/create-campaign" className="flex items-center space-x-3 hover:bg-orange-600 p-2 rounded-md">
          <FiPlusCircle size={24} />
          {isSidebarOpen && <span>Créer une campagne</span>}
        </Link>
        <Link to="/admin/listCampaigns" className="flex items-center space-x-3 hover:bg-orange-600 p-2 rounded-md">
          <FiList size={24} />
          {isSidebarOpen && <span>Liste des campagnes</span>}
        </Link>
        <Link to="/admin/settings" className="flex items-center space-x-3 hover:bg-orange-600 p-2 rounded-md">
          <FiSettings size={24} />
          {isSidebarOpen && <span>Paramètres</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
