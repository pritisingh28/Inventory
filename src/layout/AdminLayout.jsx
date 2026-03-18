import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}