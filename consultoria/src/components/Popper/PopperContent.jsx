import { useContext } from "react";
import { PopperContext } from "@/components/Popper/PopperBody";

export const PopperContent = ({ children }) => {
  const { show } = useContext(PopperContext);
  return <>{show && <>{children}</>}</>;
};

// );
