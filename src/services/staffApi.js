import API from "../config/axios";

// PRODUCTS
export const getStaffProducts = async () => {
  const res = await API.get("/product/display");
  return res.data;
};

export const getLowStockProducts = async () => {
  const res = await API.get("/product/low-stock");
  return res.data;
};

// SALES
export const createStaffSale = async (data) => {
  const res = await API.post("/product/invoice", data);
  return res.data;
};

export const getMySales = async () => {
  const res = await API.get("/product/invoice");
  return res.data;
};