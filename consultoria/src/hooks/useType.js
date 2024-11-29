import { useContext } from "react";
import { TypeContext } from "@contexts/Type/TypeContext";

export const useType = () => useContext(TypeContext);
