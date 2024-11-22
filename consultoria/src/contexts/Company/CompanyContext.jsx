import { companyReducer } from "@/reducers/companyReducer";
import { createContext, useReducer } from "react";

const CompanyContext = createContext(null);

const CompanyProvider = ({ children }) => {
  const [companyList, dispatch] = useReducer(companyReducer, []);

  const addCompany = (company) => dispatch({ type: "add", payload: company });
  const removeCompany = (id) => dispatch({ type: "remove", payload: { id } });
  const editCompany = (company) => dispatch({ type: "edit", payload: company });
  const loadCompanys = (companys) =>
    dispatch({ type: "load", payload: companys });

  return (
    <CompanyContext.Provider
      value={{
        companyList,
        addCompany,
        removeCompany,
        editCompany,
        loadCompanys,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyProvider, CompanyContext };
