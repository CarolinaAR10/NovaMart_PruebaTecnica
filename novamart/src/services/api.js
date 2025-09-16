import axios from "axios";

const BASE = import.meta.env.VITE_API_URL ?? "https://api.escuelajs.co/api/v1";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

// Inyecta token si existe
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
