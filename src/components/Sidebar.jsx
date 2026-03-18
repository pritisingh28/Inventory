import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  
  const menu = {
  admin: [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Reports", path: "/admin/reports" },
  ],
  manager: [
    { name: "Dashboard", path: "/manager" },
    { name: "Reports", path: "/manager/reports" },
    { name: "Analytics", path: "/manager/analytics" },
  ],
  staff: [
    { name: "Dashboard", path: "/staff" },
    { name: "Inventory", path: "/staff/inventory" },
    { name: "Sales", path: "/staff/sales" },
  ],
};

  return (
    <div className="w-64 bg-black text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Inventory Pro</h2>

      <ul className="space-y-3">
        {menu[role].map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}