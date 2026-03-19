import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar({ role }) {
  const [open, setOpen] = useState(false);

  const menu = {
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Manage Users", path: "/admin/users" },
      { name: "Inventory", path: "/admin/inventory" },
      { name: "Reports", path: "/admin/reports" },
    ],
    manager: [
      { name: "Dashboard", path: "/manager" },
      { name: "Products", path: "/manager/products" },
      { name: "Suppliers", path: "/manager/suppliers" },
      { name: "Sales", path: "/manager/sales" },
      { name: "Reports", path: "/manager/reports" },
      { name: "Setting", path: "/manager/setting" },
    ],
    staff: [
      { name: "Dashboard", path: "/staff" },
      { name: "Inventory", path: "/staff/inventory" },
      { name: "Sales", path: "/staff/sales" },
    ],
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-black text-white p-4">
        <h2 className="text-lg font-semibold">Inventory Pro</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 h-screen w-64 bg-black text-white p-4 transform transition-transform duration-300 z-50
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
>
        <h2 className="text-xl font-semibold mb-6 hidden md:block">
          Inventory Pro
        </h2>

        <ul className="space-y-3">
          {menu[role]?.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded transition ${
                    isActive
                      ? "bg-gray-800 font-semibold"
                      : "hover:bg-gray-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}