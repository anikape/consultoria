import style from "@components/Document/Document.module.css";

export const DocumentItem = ({ children }) => {
  return <div className={style.DocumentItem}>{children}</div>;
};
