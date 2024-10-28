import { adminReducer } from "@/reducers/adminReducer";
import { createContext, useReducer } from "react";

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [admin, dispatch] = useReducer(adminReducer, []);

  const addAdmin = (admin) => dispatch({ type: "add", payload: admin });
  const removeAdmin = (id) => dispatch({ type: "remove", payload: { id } });
  const editAdmin = (admin) => dispatch({ type: "edit", payload: admin });
  const loadAdmin = (admin) => dispatch({ type: "load", payload: admin });

  return (
    <AdminContext.Provider
      value={{ admin, addAdmin, removeAdmin, editAdmin, loadAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider, AdminContext };
