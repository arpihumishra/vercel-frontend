import axios from "axios";
import { localStorage as storage } from "../utils/localStorage.js";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = storage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeItem("token");
      storage.removeItem("user");
      // Don't force redirect here - let the auth context handle it
      console.log('API: 401 error, cleared auth data');
    }
    return Promise.reject(error);
  }
);

export default api;
