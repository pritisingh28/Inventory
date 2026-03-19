import axios from "axios";
import { baseUrl } from "../config/api";

// GET
export const getProducts = async () => {
  const res = await axios.get(`${baseUrl}/product/display`);
  return res.data;
};

// ADD
export const addProduct = async (data) => {
  const res = await axios.post(`${baseUrl}/product/add`, data);
  return res.data;
};

// UPDATE
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${baseUrl}/product/update/${id}`, data);
  return res.data;
};


// DELETE
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${baseUrl}/product/${id}`);
  return res.data;
};

