import API from "../config/axios";

// PRODUCTS
export const getStaffProducts = async () => {
  const res = await API.get("/product/display");

  console.log("📦 Products:", res.data); // ✅

  return res.data;
};

export const getLowStockProducts = async () => {
  const res = await API.get("/product/low-stock");

  console.log("⚠️ Low Stock:", res.data); // ✅

  return res.data;
};

// SALES
export const createStaffSale = async (data) => {
  const res = await API.post("/product/invoice", data);

  console.log("🧾 Created Sale:", res.data); // ✅

  return res.data;
};

export const getMySales = async () => {
  const res = await API.get("/product/invoice");

  console.log("💰 Sales:", res.data); // ✅

  return res.data;
};