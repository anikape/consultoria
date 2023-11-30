import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const api = useApi();
  const cookies = new Cookies();

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    let decoded = "";
    const token = cookies.get("authToken");

    if (token) {
      decoded = jwtDecode(token);
    }

    const isLogged = decoded ? true : false;

    if (isLogged) {
      setToken(cookies);
      setUser(decoded);
    }

    return isLogged;
  };

  const signin = async (email, password) => {
    const { accessToken } = await api.signin(email, password);

    const decoded = await jwtDecode(accessToken);
    cookies.set("authToken", accessToken);

    if (accessToken && decoded) {
      setToken(accessToken);
      setUser(decoded);
      return true;
    }

    return false;
  };

  const signout = async () => {
    setToken("");
    setUser(null);
    await api.logout();
  };

  return (
    <AuthContext.Provider value={{ token, user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
