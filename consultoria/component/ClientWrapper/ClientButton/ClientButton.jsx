import style from "./ClientButton.module.css";
import { Link } from "react-router-dom";

export const ClientButton = ({ client }) => {
  return (
    <>
      <div className={style.clientButtonsWrapper}>
        <button className={style.buttonName}>{client.name}</button>
            <Link
              to={`/clientProfile/${client.id}`}
              className={style.buttonProfile}>
              PERFIL
            </Link>
          </div>
    </>
  );
};
