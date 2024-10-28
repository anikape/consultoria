import { clientReducer } from "@/reducers/clientReducer";
import { createContext, useReducer } from "react";

const ClientContext = createContext(null);

const ClientProvider = ({ children }) => {
  const [clients, dispatch] = useReducer(clientReducer, []);

  const addClient = (client) => dispatch({ type: "add", payload: client });
  const removeClient = (id) => dispatch({ type: "remove", payload: { id } });
  const editClient = (client) => dispatch({ type: "edit", payload: client });
  const loadClients = (clients) => dispatch({ type: "load", payload: clients });

  return (
    <ClientContext.Provider
      value={{ clients, addClient, removeClient, editClient, loadClients }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientProvider, ClientContext };
