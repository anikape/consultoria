import { useEffect, useState } from "react";
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
    validateToken();
    setLoading(false);
  }, [token]);

  const validateToken = async () => {
    setLoading(true);
    const token = cookies.get("authToken");

    try {
      if (token) {
        const isLogged = api.validateToken(token);
        const decode = jwtDecode(token);
        if (isLogged) {
          setAuthenticated(true);
          setToken(token);
          setUser(decode);
          setLoading(false);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const signin = async (email, password) => {
    try {
      // setLoading(true);
      const { accessToken } = await api.signin(email, password);

      cookies.set("authToken", accessToken);

      if (accessToken) {
        setLoading(true);
        setAuthenticated(true);
        setToken(accessToken);
        setUser(jwtDecode(accessToken));

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
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
