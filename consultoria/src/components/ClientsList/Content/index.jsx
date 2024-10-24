import style from "@components/ClientsList/Content/ClientContent.module.css";

export const Content = ({ children }) => {
  return (
    <>
      <div className={style.clientList}>{children}</div>
    </>
  );
};
