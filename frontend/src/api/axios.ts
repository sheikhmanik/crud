// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5003",
});

// Axios response interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid. Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use React Router's `navigate("/login")`
    }
    return Promise.reject(error);
  }
);

export default api;
