import style from "./ClientButton.module.css";

export const ClientButton = ({ client }) => {
  return (
    <>
      <button className={style.buttonName}>{client.name}</button>
    </>
  );
};
