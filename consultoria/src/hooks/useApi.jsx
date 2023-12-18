import Cookies from "universal-cookie";
import { api } from "../../services/api";

const cookies = new Cookies();

export const useApi = () => ({
  validateToken: (token) => {
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      api.defaults.withCredentials = true;
      return true;
    }

    return false;
  },

  signin: async (email, password) => {
    try {
      const { data } = await api.post(
        "/admin/login",
        {
          login: email,
          password,
        },
        { withCredentials: true }
      );

      if (data.accessToken) {
        api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
        api.defaults.withCredentials = true;
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
