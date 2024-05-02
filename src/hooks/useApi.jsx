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
      const response = await api.post(
        "/admin/login",
        {
          login: email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      const { data } = response;

      if (data.accessToken) {
        api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
        api.defaults.withCredentials = true;
      }

      return response;
    } catch ({ response }) {
      console.log(response);
      return response;
    }
  },

  logout: async () => {
    api.defaults.headers.common["Authorization"] = "";
    cookies.remove("authToken");
  },
});
