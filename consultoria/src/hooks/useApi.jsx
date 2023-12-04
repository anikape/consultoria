import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const useApi = () => ({
  validateToken: (token) => {
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      return true;
    }

    return false;
  },

  signin: async (email, password) => {
    try {
      const { data } = await api.post("/admin/login", {
        login: email,
        password,
      });

      if (data.accessToken) {
        api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
      }

      return data;
    } catch ({ message }) {
      return message;
    }
  },

  logout: () => {
    api.defaults.headers.common["Authorization"] = "";
    cookies.remove("authToken");
  },
});
