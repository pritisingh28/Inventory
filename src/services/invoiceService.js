import axios from "../config/axios";

export const createInvoice = async (data) => {
  const res = await axios.post("/product/invoice", data);
  return res.data;
};