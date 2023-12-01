import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const cookies = new Cookies();

  useEffect(() => {
    validateToken();
    setLoading(false);
  }, []);

  const validateToken = async () => {
    const token = cookies.get("authToken");

    try {
      if (token) {
        const isLogged = api.validateToken(token);
        const decode = jwtDecode(token);
        if (isLogged) {
          setToken(token);
          setUser(decode);
          setAuthenticated(true);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const signin = async (email, password) => {
    const { accessToken } = await api.signin(email, password);

    cookies.set("authToken", JSON.stringify(accessToken));

    if (accessToken) {
      setToken(accessToken);
      setUser(jwtDecode(accessToken));
      setAuthenticated(true);
      return true;
    }

    return false;
  };

  const signout = async () => {
    setToken("");
    setUser(null);
    setAuthenticated(false);
    await api.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        token,
        user,
        signin,
        signout,
        validateToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
