import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Download } from "lucide-react";
import { getInvoices } from "../../services/reportService";

const Reports = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("7");

  useEffect(() => {
    fetchData();
  }, [filter]);

  
  const fetchData = async () => {
    try {
      const invoices = await getInvoices();

      const now = new Date();
      const days = parseInt(filter);

      const filtered = invoices.filter((inv) => {
        const date = new Date(inv.createdAt);
        return (now - date) / (1000 * 60 * 60 * 24) <= days;
      });

      // Group by date
      const grouped = {};

      filtered.forEach((inv) => {
        const date = new Date(inv.createdAt).toLocaleDateString();

        if (!grouped[date]) {
          grouped[date] = 0;
        }

        grouped[date] += inv.totalAmount;
      });

      const chartData = Object.keys(grouped).map((date) => ({
        date,
        sales: grouped[date],
      }));

      setData(chartData);

    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Reports & Analytics
      </h1>
      <p className="text-gray-500 text-sm md:text-base">
        View insights and export data
      </p>
    </div>

    {/* Buttons */}
    {/* <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
      <button className="border px-4 py-2 rounded-lg flex gap-2 items-center justify-center w-full sm:w-auto">
        <Download size={16} /> Export PDF
      </button>

      <button className="border px-4 py-2 rounded-lg flex gap-2 items-center justify-center w-full sm:w-auto">
        <Download size={16} /> Export Excel
      </button>
    </div> */}
  </div>

  {/* Filter */}
  <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
    <label className="text-sm">Date Range:</label>

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="px-3 py-2 border rounded-lg w-full sm:w-auto"
    >
      <option value="7">Last 7 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
    </select>
  </div>

  {/* Chart */}
  <div className="bg-white p-4 md:p-6 rounded-xl shadow w-full">

    <h2 className="font-semibold mb-4 text-sm md:text-base">
      📈 Sales Trend Report
    </h2>

    <div className="w-full h-[250px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#10B981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>
  );
};

export default Reports;