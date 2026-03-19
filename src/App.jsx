import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import AdminInventory from "./pages/Admin/Inventory";
import AdminReports from "./pages/Admin/Reports";

// Manager
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import ManagerReports from "./pages/Manager/Reports";
import Analytics from "./pages/Manager/Analytics";
import Products from "./pages/Manager/Products";
import Suppliers from "./pages/Manager/Suppliers";
import ManagerSales from "./pages/Manager/Sales";
import Setting from "./pages/Manager/Setting";

// Staff
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffInventory from "./pages/Staff/Inventory";
import Sales from "./pages/Staff/Sales";
import AddEditProduct from "./components/AddEditProduct";
import AddSupplier from "./components/AddSupplier";

const App = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<SignIn />} />

      {/* ALL DASHBOARD ROUTES */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin", "manager", "staff"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/reports" element={<AdminReports />} />

        {/* Manager */}
        <Route path="/manager">
          <Route index element={<ManagerDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/add" element={<AddSupplier />} />
          <Route path="sales" element={<ManagerSales />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Staff */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/inventory" element={<StaffInventory />} />
        <Route path="/staff/sales" element={<Sales />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
