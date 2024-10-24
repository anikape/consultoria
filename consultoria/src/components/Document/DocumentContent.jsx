import style from "@components/Document/Document.module.css";

export const DocumentContent = ({ children }) => {
  return <div className={style.DocumentContent}>{children}</div>;
};
