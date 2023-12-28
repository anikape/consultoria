import { api } from "../../services/api";

export const useFetch = () => ({
  getData: async (endpoint) => {
    try {
      const response = await api.get(endpoint, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },
});
