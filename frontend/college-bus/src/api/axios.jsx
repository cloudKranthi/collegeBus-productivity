import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8800", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});
// Optional: attach token automatically if you store it
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req
});
export default API;