import Cookies from "universal-cookie";
import { api } from "../../services/api";

const cookies = new Cookies();

export const useApi = () => ({
  validateToken: (token) => {
    if (token) {
      return token;
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
      
      if(response.status !== 200){
        throw new Error(response.data)
      }
      
    
      return response;
      
    } catch (error) {
      console.log(error.response)
      return error.response;
    }
  },

  logout: () => {
    cookies.remove("authToken");
    cookies.remove("accessToken");
    api.defaults.headers.common["Authorization"] = "";
  },
});
