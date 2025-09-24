import api from "./api.js";
import { localStorage as storage } from "../utils/localStorage.js";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    // Backend returns: { success: true, data: { token, user } }
    return response.data.data; // Extract the nested data
  },

  async register(userData) {
    const response = await api.post("/auth/register", userData);
    // Backend returns: { success: true, data: { token, user } }
    return response.data.data; // Extract the nested data
  },

  async getProfile() {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  logout() {
    storage.removeItem("token");
    storage.removeItem("user");
  }
};
