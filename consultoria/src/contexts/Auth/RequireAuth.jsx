import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/AuthContext";

import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  return children;
};
