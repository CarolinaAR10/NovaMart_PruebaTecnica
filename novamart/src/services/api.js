import axios from "axios";

const BASE = import.meta.env.VITE_API_URL ?? "https://fakeapi.platzi.com";

const api = axios.create({
  baseURL: BASE,
  timeout: 8000,
});

export default api;
