import { useContext } from "react";
// import { AuthContext } from "../contexts/auth";
import { AuthContext } from "../contexts/Auth/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
