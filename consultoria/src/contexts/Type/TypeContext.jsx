import { typeReducer } from "@/reducers/typeReducer";
import { createContext, useReducer } from "react";

const TypeContext = createContext(null);

const TypeProvider = ({ children }) => {
  const [typeList, dispatch] = useReducer(typeReducer, []);

  const addType = type => dispatch({ type: "add", payload: type });
  const removeType = id => dispatch({ type: "remove", payload: id });
  const editType = type => dispatch({ type: "edit", payload: type });
  const loadTypes = types => dispatch({ type: "load", payload: types });

  return (
    <TypeContext.Provider
      value={{ typeList, addType, removeType, editType, loadTypes }}>
      {children}
    </TypeContext.Provider>
  );
};

export { TypeProvider, TypeContext };
