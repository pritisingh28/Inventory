import React, { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Building2 } from "lucide-react";
import {
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  addSupplier,
} from "../../services/supplierService";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleAddSubmit = async () => {
  try {
    const res = await addSupplier(formData);

    // 🔥 IMPORTANT (depends on backend response)
    const newSupplier = res.supplier || res;

    setSuppliers((prev) => [...prev, newSupplier]);

    setIsModalOpen(false);

    // reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

  } catch (err) {
    console.log(err);
    alert("Add failed");
  }
};

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

  // ✅ DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this supplier?");
    if (!confirm) return;

    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ OPEN EDIT MODAL
  const handleEdit = (s) => {
    setSelectedSupplier(s);
    setFormData({
      name: s.name || "",
      email: s.email || "",
      phone: s.phone || "",
      address: s.address || "",
    });
    setIsModalOpen(true);
  };

  // ✅ OPEN ADD MODAL
  const handleAdd = () => {
    setSelectedSupplier(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsModalOpen(true);
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      await updateSupplier(selectedSupplier._id, formData);

      setSuppliers((prev) =>
        prev.map((s) =>
          s._id === selectedSupplier._id ? { ...s, ...formData } : s
        )
      );

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Suppliers</h1>
          <p className="text-gray-500 text-sm">
            Manage your supplier relationships
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Supplier
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((s) => (
          <div
            key={s._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
          >
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">{s.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {s.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="p-2 rounded-lg hover:bg-blue-100"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="p-2 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>{s.email}</p>
              <p>{s.phone}</p>
              <p>{s.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-semibold mb-4">
              {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-3 py-2 border rounded-lg"
              />

            </div>

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              {selectedSupplier ? (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Update
                </button>
              ) : (
               <button
  onClick={handleAddSubmit}
  className="px-4 py-2 bg-green-500 text-white rounded-lg"
>
  Add Supplier
</button>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;