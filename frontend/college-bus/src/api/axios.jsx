import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8800", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically if you store it
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
