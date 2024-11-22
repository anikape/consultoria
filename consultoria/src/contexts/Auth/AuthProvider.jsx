import { useEffect, useState } from "react";
// import { AuthContext } from "@/AuthContext";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { useApi } from "@/hooks/useApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = useApi();
  const cookies = new Cookies();

  useEffect(() => {
    validateToken();
    setLoading(false);
  }, []);

  const validateToken = () => {
    setLoading(true);

    const token = cookies.get("authToken");

    try {
      if (token) {
        const isLogged = api.validateToken(token);

        if (isLogged) {
          const decode = jwtDecode(token);
          setAuthenticated(true);
          setToken(token);
          setUser(decode);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }

    return false;
  };

  const signin = async (email, password) => {
    try {
      const response = await api.signin(email, password);

      const { status, data } = response;

      if (status !== 200) {
        setAuthenticated(false);
        setToken(null);
        setUser(null);

        setError(response.data);
        throw new Error(response.data);
      }

      if (data.accessToken) {
        cookies.set("authToken", data.accessToken, {
          secure: true,
          sameSite: "none",
        });

        const decode = jwtDecode(data.accessToken);
        setLoading(true);
        setAuthenticated(true);
        setUser(decode);
        setToken(data.accessToken);
      }

      return response;
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setToken("");
    setAuthenticated(false);
    setUser(null);
    setError(null);
    await api.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        token,
        error,
        loading,
        signin,
        signout,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
