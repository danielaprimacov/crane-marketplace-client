import apiClient from "./apiClient";

export const craneApi = {
  getAll: async () => {
    const response = await apiClient.get("/cranes");
    return response.data;
  },

  getById: async (craneId, config = {}) => {
    const response = await apiClient.get(`/cranes/${craneId}`, config);
    return response.data;
  },

  getMine: async () => {
    const response = await apiClient.get("/cranes/my", config);
    return response.data;
  },

  create: async (payload) => {
    const response = await apiClient.post("/cranes", payload);
    return response.data;
  },

  update: async (craneId, payload) => {
    const response = await apiClient.put(`/cranes/${craneId}`, payload);
    return response.data;
  },

  delete: async (craneId) => {
    const response = await apiClient.delete(`/cranes/${craneId}`);
    return response.data;
  },
};
