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
export const register = async (username, email, password, role) => {
  const res = await axios.post(`${baseUrl}/auth/register`, {
    username,
    email,
    password,
    role,
  });

  return res.data;
};

// 🚪 LOGOUT WITH API
export const logout = async () => {
  const token = localStorage.getItem("token");

  await axios.post(
    `${baseUrl}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.removeItem("token");
  localStorage.removeItem("role");
};