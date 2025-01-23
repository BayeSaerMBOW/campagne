import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLogout = () => {
    console.log("Déconnexion réussie !");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-20 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Navbar et contenu principal */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Navbar */}
        <div className="fixed top-0 right-0 z-10 h-16" style={{ left: isSidebarOpen ? '256px' : '64px' }}>
          <Navbar
            toggleSidebar={toggleSidebar}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />
        </div>

        {/* Contenu principal */}
        <div className="pt-16 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;