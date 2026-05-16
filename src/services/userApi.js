import apiClient from "./apiClient";

export const userApi = {
  getProfile: async (config = {}) => {
    const response = await apiClient.get("/users/profile", config);
    return response.data;
  },

  updateProfile: async (payload) => {
    const response = await apiClient.patch("/users/profile", payload);
    return response.data;
  },

  deleteProfile: async () => {
    const response = await apiClient.delete("/users/profile");
    return response.data;
  },
};
