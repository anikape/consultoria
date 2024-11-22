import { useContext } from "react";
import { AdminContext } from "@contexts/Admin/AdminContext";

export const useAdmin = () => useContext(AdminContext);
