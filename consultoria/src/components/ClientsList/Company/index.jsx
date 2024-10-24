import style from "@components/ClientsList/Company/ClientCompanyContent.module.css";

export const Company = ({ children }) => (
  <div className={style.contentClient}>{children}</div>
);
