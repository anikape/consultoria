import { useContext } from "react";
import { ClientContext } from "@contexts/Client/ClientContext";

export const useClient = () => useContext(ClientContext);
