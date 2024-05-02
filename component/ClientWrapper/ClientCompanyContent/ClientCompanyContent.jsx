import style from "./ClientCompanyContent.module.css";
export const ClientCompanyContent = ({ children }) => {
  return (
    <>
      <div className={style.contentClient}>{children}</div>
    </>
  );
};
