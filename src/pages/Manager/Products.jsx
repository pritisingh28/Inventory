import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getProducts, deleteProduct } from "../../services/inventoryService";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // 🟢 Status Logic
  const getStatus = (p) => {
    if (p.stock === 0) return "Out";
    if (p.stock <= p.minStock) return "Low";
    return "In";
  };

  const statusStyle = (status) => {
    if (status === "In") return "bg-green-100 text-green-600";
    if (status === "Low") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>
      <p className="text-gray-500 text-sm md:text-base">
        Manage your inventory items
      </p>
    </div>

    <button
      onClick={() => navigate("/manager/products/add")}
      className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition w-full md:w-auto justify-center"
    >
      <Plus size={18} /> Add Product
    </button>
  </div>

  {/* Search */}
  <div className="flex flex-col md:flex-row gap-3 mb-4">
    <input
      type="text"
      placeholder="Search products..."
      className="flex-1 px-4 py-2 border rounded-lg"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select className="px-4 py-2 border rounded-lg">
      <option>All Categories</option>
    </select>
  </div>

  {/* DESKTOP TABLE */}
  <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-gray-50 text-gray-600 text-sm">
        <tr>
          <th className="p-4">SKU</th>
          <th>PRODUCT NAME</th>
          <th>CATEGORY</th>
          <th>QUANTITY</th>
          <th>PRICE</th>
          <th>STATUS</th>
          <th className="text-right pr-6">ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        {filteredProducts.map((p, index) => {
          const status = getStatus(p);

          return (
            <tr key={p._id} className="border-t">
              <td className="p-4">
                SALE{String(index + 1).padStart(3, "0")}
              </td>

              <td className="font-medium">{p.name}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>₹{p.price}</td>

              <td>
                <span className={`px-3 py-1 rounded-full text-sm ${statusStyle(status)}`}>
                  {status === "In"
                    ? "In Stock"
                    : status === "Low"
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
              </td>

              <td className="flex justify-end gap-2 pr-6">
                <button
                  onClick={() => navigate(`/manager/products/edit/${p._id}`)}
                  className="p-2 rounded-lg hover:bg-blue-100"
                >
                  <Pencil size={18} className="text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="p-2 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* MOBILE CARDS */}
  <div className="md:hidden space-y-4">
    {filteredProducts.map((p, index) => {
      const status = getStatus(p);

      return (
        <div key={p._id} className="bg-white p-4 rounded-xl shadow">

          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">{p.name}</h2>

            <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(status)}`}>
              {status}
            </span>
          </div>

          <p className="text-sm text-gray-500">{p.category}</p>

          <div className="flex justify-between mt-2 text-sm">
            <span>Stock: {p.stock}</span>
            <span>₹{p.price}</span>
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={() => navigate(`/manager/products/edit/${p._id}`)}
              className="p-2 rounded-lg bg-blue-100"
            >
              <Pencil size={16} className="text-blue-600" />
            </button>

            <button
              onClick={() => handleDelete(p._id)}
              className="p-2 rounded-lg bg-red-100"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>

        </div>
      );
    })}
  </div>

</div>
  );
};

export default Products;
