import { adminReducer } from "@/reducers/adminReducer";
import { createContext, useReducer } from "react";

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [adminList, dispatch] = useReducer(adminReducer, []);

  const addAdmin = admin => dispatch({ type: "add", payload: admin });
  const removeAdmin = id => dispatch({ type: "remove", payload: { id } });
  const editAdmin = admin => dispatch({ type: "edit", payload: admin });
  const loadAdmin = admins => dispatch({ type: "load", payload: admins });

  return (
    <AdminContext.Provider
      value={{ adminList, addAdmin, removeAdmin, editAdmin, loadAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider, AdminContext };
