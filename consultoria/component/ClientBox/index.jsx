import style from "./ClientBox.module.css";

export const ClientBox = ({ client }) => {
  return (
    <>
      <button className={style.buttonName}>{client.name}</button>
    </>
  );
};
