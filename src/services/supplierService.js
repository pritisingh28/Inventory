import axios from "../config/axios";

// GET
export const getSuppliers = async () => {
  const res = await axios.get("/supplier/display");
  return res.data;
};

// ADD
export const addSupplier = async (data) => {
  const res = await axios.post("/supplier/add", data);
  return res.data;
};

// UPDATE
export const updateSupplier = async (id, data) => {
  const res = await axios.put(`/supplier/update/${id}`, data);
  return res.data;
};

// DELETE
export const deleteSupplier = async (id) => {
  const res = await axios.delete(`/supplier/delete/${id}`);
  return res.data;
};