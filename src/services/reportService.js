import axios from "../config/axios";

export const getInvoices = async () => {
  const res = await axios.get("/product/invoice");
  return res.data;
};