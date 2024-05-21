import style from "./Document.module.css";

export const DocumentContent = ({ children }) => {
  return <div className={style.DocumentContent}>{children}</div>;
};
