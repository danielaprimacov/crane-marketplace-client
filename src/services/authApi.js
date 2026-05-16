import apiClient from "./apiClient";

export const authApi = {
  verify: async () => {
    const response = await apiClient.get("/auth/verify");
    return response.data.user;
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
