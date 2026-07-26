import axios from "axios";

// Base URL comes from Vite env var, falling back to local dev server
const API_BASE_URL = "https://blood-bank-backend-mbib.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the JWT (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bloodbridge_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401 (expired/invalid token) so the app doesn't get stuck
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("bloodbridge_token");
      localStorage.removeItem("bloodbridge_user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
