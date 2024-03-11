import {useContext} from "react";
import { AuthContext } from "./AuthContext";

import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  
  // console.log(auth.validateToken)

  // const teste = async ()=>  await auth.validateToken()
  // teste()
  
  // console.log(auth.authenticated)
  
  if (!auth.authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
