import { createContext } from "react";
import { useState } from "react";

export const PopperContext = createContext(null);

export const PopperBody = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <PopperContext.Provider value={{ show, setShow }}>
      {children}
    </PopperContext.Provider>
  );
};
