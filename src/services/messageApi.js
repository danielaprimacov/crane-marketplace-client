import apiClient from "./apiClient";

export const messageApi = {
  create: async (payload, config = {}) => {
    const response = await apiClient.post("/messages", payload, config);
    return response.data;
  },

  getAllAdmin: async (config = {}) => {
    const response = await apiClient.get("/messages", config);
    return response.data;
  },

  deleteAdmin: async (messageId) => {
    const response = await apiClient.delete(`/messages/${messageId}`);
    return response.data;
  },
};
