import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Signin from "../../../pages/Signin";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate;

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  return children;
};
