import { api } from "../../services/api";

export const useFetch = () => ({
  getSimple: async (endpoint) => {
    try {
      const response = await api.get(endpoint);

      return response;
    } catch (error) {
      return error;
    }
  },

  getData: async (endpoint) => {
    try {
      const response = await api.get(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  postData: async (endpoint, body) => {
    try {
      const response = await api.post(endpoint, body, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
