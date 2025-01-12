import axios from "axios";
import apiUrl from "../api";

const axiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your API URL
  timeout: 10000, // Optional: Set a timeout
});

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

export default axiosInstance;
