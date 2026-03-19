import axios from "axios";
import { baseUrl } from "./api";

const instance = axios.create({
  baseURL: baseUrl,
});

// 🔐 Attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;