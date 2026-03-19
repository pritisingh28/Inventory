import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/inventoryService";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  if (id) {
    fetchProduct();
  }
}, [id]);

const fetchProduct = async () => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p._id === id);

    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        minStock: product.minStock,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateProduct(id, form);
        alert("Updated successfully");
      } else {
        await addProduct(form);
        alert("Added successfully");
      }

      navigate("/manager/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="name" placeholder="Product Name" onChange={handleChange} className="input" />

          <input name="category" placeholder="Category" onChange={handleChange} className="input" />

          <input name="price" placeholder="Price" onChange={handleChange} className="input" />

          <input name="stock" placeholder="Stock" onChange={handleChange} className="input" />

          <input name="minStock" placeholder="Min Stock" onChange={handleChange} className="input" />

          <button className="w-full bg-green-500 text-white py-2 rounded-lg">
            {id ? "Update Product" : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;