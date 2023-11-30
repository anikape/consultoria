import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("authToken");

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  return config;
});

if (token) {
  api.defaults.headers["Authorization"] = `Barear ${token}`;
}

export const useApi = () => ({
  validateToken: (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return token;
    }

    delete api.defaults.headers.common["Authorization"];
    return token;
  },

  signin: async (email, password) => {
    try {
      const { data } = await api.post("/admin/login", {
        login: email,
        password,
      });

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
