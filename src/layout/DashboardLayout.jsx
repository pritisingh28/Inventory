import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 mt-15 md:mt-0 p-4 md:p-6 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
}