import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import { Box, AlertTriangle, DollarSign, Users } from "lucide-react";

import {
  getProducts,
  getLowStock,
  getSuppliers,
  getInvoices
} from "../../services/dashboardService";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const ManagerDashboard = () => {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const products = await getProducts();
      const lowStock = await getLowStock();
      const suppliers = await getSuppliers();
      const invoices = await getInvoices();

      // 📊 Stats
      const totalProducts = products.length;
      const lowStockCount = lowStock.length;
      const totalSuppliers = suppliers.length;

      const totalSales = invoices.reduce(
        (sum, inv) => sum + inv.totalAmount,
        0
      );

      setStats({
        totalProducts,
        lowStock: lowStockCount,
        suppliers: totalSuppliers,
        sales: totalSales,
      });

      // 📈 Sales Trend
      const trend = invoices.map((inv) => ({
        date: new Date(inv.createdAt).toLocaleDateString(),
        sales: inv.totalAmount,
      }));

      setSalesData(trend);

      // 📦 Stock Distribution
      const inStock = products.filter(p => p.stock > p.minStock).length;
      const low = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
      const out = products.filter(p => p.stock === 0).length;

      setStockData([
        { name: "In Stock", value: inStock },
        { name: "Low Stock", value: low },
        { name: "Out of Stock", value: out },
      ]);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
  fetchData();

  const interval = setInterval(() => {
    fetchData();
  },); // 10 sec

  return () => clearInterval(interval);
}, []);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

  {/* Header */}
  <h1 className="text-2xl md:text-3xl font-semibold mb-2">Dashboard</h1>
  <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
    Welcome back! Here's what's happening today.
  </p>

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

    <Card title="Total Products" value={stats.totalProducts || 0} icon={Box} color="bg-green-500" />
    <Card title="Low Stock Items" value={stats.lowStock || 0} icon={AlertTriangle} color="bg-orange-500" />
    <Card title="Sales Today" value={`₹${stats.sales || 0}`} icon={DollarSign} color="bg-blue-500" />
    <Card title="Total Suppliers" value={stats.suppliers || 0} icon={Users} color="bg-gray-900" />

  </div>

  {/* Charts */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

    {/* Sales Trend */}
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="mb-4 font-semibold text-sm md:text-base">Sales Trend</h2>

      <div className="w-full h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Stock */}
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="mb-4 font-semibold text-sm md:text-base">Stock Distribution</h2>

      <div className="w-full h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={stockData} dataKey="value" outerRadius={80}>
              {stockData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>
</div>
  );
};

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

    <div>
      <p className="text-gray-500 text-xs md:text-sm">{title}</p>
      <h2 className="text-xl md:text-2xl font-semibold">{value}</h2>
    </div>

    <div className={`p-2 md:p-3 rounded-lg ${color}`}>
      <Icon className="text-white" size={18} />
    </div>

  </div>
);

export default ManagerDashboard;