// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import DashboardPage from "./components/pages/DashboardPage";
import CreateCampaignForm from "./components/pages/CreateCampaignForm";
import ListCampaigns from "./components/pages/ListCampaigns";
import Settings from "./components/pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
       

        {/* Admin routes wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="create-campaign" element={<CreateCampaignForm />} />
          <Route path="listCampaigns" element={<ListCampaigns />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;