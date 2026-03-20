import { useEffect, useState } from "react";
import {
  getStaffProducts,
  getLowStockProducts,
  getMySales,
} from "../../services/staffApi";

const StaffDashboard = () => {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const p = await getStaffProducts();
      const l = await getLowStockProducts();
      const s = await getMySales();

      setProducts(p);
      setLowStock(l);
      setSales(s);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          Total Products: {products.length}
        </div>

        <div className="bg-white p-4 shadow rounded">
          Low Stock: {lowStock.length}
        </div>

        <div className="bg-white p-4 shadow rounded">
          My Sales: {sales.length}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;