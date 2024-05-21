import style from "./Document.module.css";

export const DocumentActions = ({ children }) => {
  return <div className={style.DocumentActions}>{children}</div>;
};
