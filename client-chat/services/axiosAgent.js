import axios from "axios";
import { getToken } from "./jwtService";

const axiosAgent = axios.create({
  baseURL: "http://localhost:5001",
});

axiosAgent.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAgent;
