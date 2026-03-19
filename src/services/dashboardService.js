import { baseUrl } from "../config/api";
import axios from "axios";

// 📦 Products
export const getProducts = async () => {
  const res = await axios.get(`${baseUrl}/product/display`);
  return res.data;
};

// ⚠️ Low stock
export const getLowStock = async () => {
  const res = await axios.get(`${baseUrl}/product/low-stock`);
  return res.data;
};

// 🤝 Suppliers
export const getSuppliers = async () => {
  const res = await axios.get(`${baseUrl}/supplier/display`);
  return res.data;
};

// 🧾 Invoices (Sales)
export const getInvoices = async () => {
  const res = await axios.get(`${baseUrl}/product/invoice`);
  return res.data;
};