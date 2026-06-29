import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // optional but useful if you later use cookies
});

// Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

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
    // If token is invalid or expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // Optional: force redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;