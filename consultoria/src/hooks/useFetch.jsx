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
  uploadFile: async (endpoint, body) => {
    try {
      const response = await api.post(endpoint, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  deleteData: async (endpoint, body) => {
    try {
      const response = await api.delete(endpoint, body, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
