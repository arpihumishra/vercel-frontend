import api from "./api.js";

export const tenantService = {
  async upgradeTenant(tenantSlug) {
    const response = await api.post(`/tenants/${tenantSlug}/upgrade`);
    // Backend returns: { success: true, data: { tenant: {...} } }
    return response.data.data; // Extract the nested data
  },

  async getTenant(tenantSlug) {
    const response = await api.get(`/tenants/${tenantSlug}`);
    // Backend returns: { success: true, data: { tenant: {...} } }
    return response.data.data; // Extract the nested data
  }
};