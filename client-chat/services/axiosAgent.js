import axios from "axios";
import { getToken } from "./jwtService";

const axiosAgent = axios.create({
  baseURL: "http://localhost:5001",
});

axiosAgent.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    console.log("Token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    // Handle any errors in fetching the token
    console.error("Error fetching token:", error);
    return config;
  }
});

export default axiosAgent;
