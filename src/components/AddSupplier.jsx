import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../services/supplierService";

const AddSupplier = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSupplier(form);
      alert("Supplier added successfully");
      navigate("/manager/suppliers");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Supplier</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Company Name"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            name="contactPerson"
            placeholder="Contact Person"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Add Supplier
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddSupplier;