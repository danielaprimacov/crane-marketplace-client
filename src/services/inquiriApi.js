import apiClient from "./apiClient";

export const inquiryApi = {
  create: async (payload) => {
    const response = await apiClient.post("/inquiries", payload);
    return response.data;
  },

  getAllAdmin: async () => {
    const response = await apiClient.get("/inquiries");
    return response.data;
  },

  getByIdAdmin: async (inquiryId) => {
    const response = await apiClient.get(`/inquiries/${inquiryId}`);
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
