import apiClient from "./apiClient";

export const inquiryApi = {
  create: async (payload, config = {}) => {
    const response = await apiClient.post("/inquiries", payload, config);
    return response.data;
  },

  getAllAdmin: async (config = {}) => {
    const response = await apiClient.get("/inquiries", config);
    return response.data;
  },

  getByIdAdmin: async (inquiryId, config = {}) => {
    const response = await apiClient.get(`/inquiries/${inquiryId}`, config);
    return response.data;
  },

  updateAdmin: async (inquiryId, payload) => {
    const response = await apiClient.put(`/inquiries/${inquiryId}`, payload);
    return response.data;
  },

  deleteAdmin: async (inquiryId) => {
    const response = await apiClient.delete(`/inquiries/${inquiryId}`);
    return response.data;
  },
};
