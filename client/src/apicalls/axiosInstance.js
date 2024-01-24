import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Add a request interceptor to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or wherever you store it
    const token = localStorage.getItem("token");

    // Set the Authorization header if the token is available
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
