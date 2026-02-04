import API from "./axios";

export const login = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};
