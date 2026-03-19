import axios from "axios";
import { baseUrl } from "../config/api";

// 🔐 LOGIN
export const login = async (email, password) => {
  const res = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });

  return res.data;
};

// 📝 REGISTER
export const register = async (name, email, password, role) => {
  const res = await axios.post(`${baseUrl}/auth/register`, {
    name,
    email,
    password,
    role,
  });

  return res.data;
};