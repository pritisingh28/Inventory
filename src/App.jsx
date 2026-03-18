import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth
import SignIn from "./pages/SignIn";

// Layouts
import AdminLayout from "./layout/AdminLayout";
import ManagerLayout from "./layout/ManagerLayout";
import StaffLayout from "./layout/StaffLayout";

// Admin Pages
import AdminDashboard from "./components/Admin/AdminDashboard";
import Users from "./components/Admin/Users";
import AdminInventory from "./components/Admin/Inventory";
import AdminReports from "./components/Admin/Reports";

// Manager Pages
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import ManagerReports from "./components/Manager/Reports";
import Analytics from "./components/Manager/Analytics";

// Staff Pages
import StaffDashboard from "./components/Staff/StaffDashboard";
import StaffInventory from "./components/Staff/Inventory";
import Sales from "./components/Staff/Sales";

const App = () => {
  return (
    <Routes>
      {/* 🔐 Auth */}
      <Route path="/" element={<SignIn />} />

      {/* 👑 Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* 📊 Manager */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<ManagerDashboard />} />
        <Route path="reports" element={<ManagerReports />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* 📦 Staff */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffDashboard />} />
        <Route path="inventory" element={<StaffInventory />} />
        <Route path="sales" element={<Sales />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default App;