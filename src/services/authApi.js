import apiClient from "./apiClient";

export const authApi = {
  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (payload) => {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
  },
};
