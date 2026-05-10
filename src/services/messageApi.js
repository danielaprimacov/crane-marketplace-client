import apiClient from "./apiClient";

export const messageApi = {
  create: async (payload) => {
    const response = await apiClient.post("/messages", payload);
    return response.data;
  },

  getAllAdmin: async () => {
    const response = await apiClient.get("/messages");
    return response.data;
  },

  deleteAdmin: async (messageId) => {
    const response = await apiClient.delete(`/messages/${messageId}`);
    return response.data;
  },
};
