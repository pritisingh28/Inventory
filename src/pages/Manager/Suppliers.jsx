import React, { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getSuppliers,
  deleteSupplier,
} from "../../services/supplierService";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Suppliers</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your supplier relationships
          </p>
        </div>

        <button
          onClick={() => navigate("/manager/suppliers/add")}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Supplier
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {suppliers.map((s) => (
          <div
            key={s._id}
            className="bg-white p-4 sm:p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">

              <div className="flex gap-3 items-center">
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-base sm:text-lg">
                    {s.name}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {s.contactPerson}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1 sm:gap-2">

                <button
                  onClick={() =>
                    navigate(`/manager/suppliers/edit/${s._id}`)
                  }
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-100 transition"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-red-100 transition"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>

              </div>
            </div>

            {/* Details */}
            <div className="text-xs sm:text-sm text-gray-600 space-y-1 break-words">
              <p>{s.email}</p>
              <p>{s.phone}</p>
              <p>{s.address}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Suppliers;