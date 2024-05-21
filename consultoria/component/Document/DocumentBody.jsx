import style from "./Document.module.css";

export const DocumentBody = ({ children }) => {
  return (
    <>
      <div className={style.DocumentBody}>{children}</div>
    </>
  );
};
