import { useContext } from "react";
import { CompanyContext } from "@contexts/Company/CompanyContext";

export const useCompany = () => useContext(CompanyContext);
