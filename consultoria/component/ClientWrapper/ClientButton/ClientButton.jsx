import style from "./ClientButton.module.css";
import { Link } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";

export const ClientButton = ({ client }) => {
  return (
    <div className={style.clientButtonsWrapper}>
      <button className={style.buttonName}>{client.name}</button>
      <Link to={`/clientProfile/${client.id}`} className={style.buttonProfile}>
        <HiUsers className={style.icon} />
        <span>PERFIL</span>
      </Link>
    </div>
  );
};
