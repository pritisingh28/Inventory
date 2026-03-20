import { useEffect, useState } from "react";
import { Package, AlertTriangle, ShoppingCart } from "lucide-react";
import {
  getStaffProducts,
  getLowStockProducts,
  getMySales,
} from "../../services/staffApi";

const StaffDashboard = () => {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // every 5 sec

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const p = await getStaffProducts();
      const l = await getLowStockProducts();
      const s = await getMySales();

      setProducts(p);
      setLowStock(l);
      setSales(s);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 💰 Total Revenue
  const totalRevenue = sales.reduce(
    (sum, inv) => sum + (inv.totalAmount || 0),
    0,
  );

  const sortedSales = [...sales].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Staff Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of your activity</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Products */}
            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Products</p>
                <h2 className="text-xl font-semibold">{products.length}</h2>
              </div>
            </div>

            {/* Low Stock */}
            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertTriangle className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Low Stock</p>
                <h2 className="text-xl font-semibold">{lowStock.length}</h2>
              </div>
            </div>

            {/* Sales Count */}
            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <ShoppingCart className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">My Sales</p>
                <h2 className="text-xl font-semibold">{sales.length}</h2>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">💰</div>
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <h2 className="text-xl font-semibold">₹{totalRevenue}</h2>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          {/* Recent Sales */}
<div className="bg-white rounded-xl shadow p-4">

  <h2 className="text-lg font-semibold mb-4">
    Recent Sales
  </h2>

  {sales.length === 0 ? (
    <p className="text-gray-400 text-sm">No sales yet</p>
  ) : (
    <div className="max-h-72 overflow-y-auto pr-2 space-y-3">

      {sortedSales.map((s) => (
        <div
          key={s._id}
          className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 px-2 rounded"
        >
          <div>
            <p className="font-medium">
              {s.customerName || "Customer"}
            </p>

            <p className="text-gray-400 text-xs">
              {new Date(s.createdAt).toLocaleString()}
            </p>

            <p className="text-xs text-gray-400">
              {s.items?.length} item(s)
            </p>
          </div>

          <p className="font-semibold text-green-600">
            ₹{s.totalAmount}
          </p>
        </div>
      ))}

    </div>
  )}
</div>
        </>
      )}
    </div>
  );
};

export default StaffDashboard;
