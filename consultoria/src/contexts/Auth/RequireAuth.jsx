import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Signin from "../../../pages/Signin";

export const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth.token) {
    return <Signin />;
  }

  return children;
};
