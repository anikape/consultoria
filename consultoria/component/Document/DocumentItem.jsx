import style from "./Document.module.css";

export const DocumentItem = ({ children }) => {
  return <div className={style.DocumentItem}>{children}</div>;
};
