import style from "./ClientContent.module.css";

export const ClientContent = ({ children }) => {
  return (
    <>
      <div className={style.clientList}>{children}</div>
    </>
  );
};
