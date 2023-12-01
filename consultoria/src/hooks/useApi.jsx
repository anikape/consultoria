import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("authToken");
console.debug(token);

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000,
});

// const inteceptConf = async (config) => {
//   // const token = await cookies.get("authToken");

//   console.log(token);
//   console.log(api.defaults.headers);

//   if (token) {
//     api.defaults.headers["Authorization"] = `Barear ${token}`;
//   }
//   return config;
// };

// api.interceptors.request.use(inteceptConf);

// api.interceptors.request.use((config) => {
//   return config;
// });

// if (token) {
//   api.defaults.headers["Authorization"] = `Barear ${token}`;
// }

export const useApi = () => ({
  validateToken: (token) => {
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      console.debug(
        "Token: ",
        token,
        "Autorização: ",
        api.defaults.headers.Authorization
      );
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
