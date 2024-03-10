import {useEffect, useState} from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const cookies = new Cookies();
  
  
  useEffect(() => {
    validateToken(token);
    // setLoading(false);
    // console.log("Está autenticado: ",authenticated)
  }, [token]);
  
  const validateToken = async () => {
    setLoading(true);
    
    const accessToken = cookies.get("authToken");
    const isLogged = await api.validateToken(accessToken);
    
    try {
      if (isLogged) {
    
        const decode = jwtDecode(accessToken);
        setAuthenticated(true);
        if (isLogged) {
            setAuthenticated(true);
            setToken(accessToken);
            setUser(decode);
            setLoading(false);
          return true;
          }
        }
      } catch (error) {
        console.log(error);
      }
      
      setAuthenticated(false);
      return false;
  };

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const  response  = await api.signin(email, password);
     
      const {status, data} = response
             
      cookies.set("authToken", data.accessToken, { secure: true, sameSite: "none" });
      
      if (status !== 200) {
        setAuthenticated(false);
        setToken(null);
        setUser(null);
        return response;
      }
      
      const decode = jwtDecode(data.accessToken)
      
      setLoading(false);
      setAuthenticated(true);
      setUser(decode);
    
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    validateToken(null)
    setUser(null);
    setAuthenticated(false);
   api.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        token,
        signin,
        signout,
        validateToken
      }}>
      {children}
    </AuthContext.Provider>
  );
};
