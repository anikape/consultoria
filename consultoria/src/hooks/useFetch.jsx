import { api } from "@/services/api";

export const useFetch = () => ({
  getData: async (endpoint, body = "") => {
    try {
      const response = await api.get(endpoint, body, {
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
  editPassword: async (endpoint, body) => {
    try {
      const response = await api.patch(endpoint, body, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  deleteClient: async (id) => {
    const endpoint = `/client/${id}`;
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },

  deleteCompany: async (id) => {
    const endpoint = `/company/${id}`;
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
