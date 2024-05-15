import { useContext } from "react";
import { PopperContext } from "./PopperBody";

export const PopperContent = ({ children }) => {
  const { show } = useContext(PopperContext);
  return <>{show && <>{children}</>}</>;
};

// );
