import axios from "axios";

// Base URL from Vercel/Env
const API_BASE = import.meta.env.VITE_API_URL;

// Create axios instance
const API = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Attach JWT token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    console.log("Token =", localStorage.getItem("token"));

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// Global response handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized access
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;