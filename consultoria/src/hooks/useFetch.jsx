import { api } from "../../services/api";

export const useFetch = () => ({
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

  deleteData: async (endpoint) => {
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  editData: async (endpoint, body) => {
    try {
      const response = await api.put(endpoint, body, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
