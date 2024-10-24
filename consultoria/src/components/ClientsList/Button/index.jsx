import style from "@components/ClientsList/Button/Button.module.css";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

export const Button = ({ client }) => {
  return (
    <div className={style.clientButtonsWrapper}>
      <button className={style.buttonName}>{client.name}</button>
      <Link to={`/clientProfile/${client.id}`} className={style.buttonProfile}>
        <BsInfoCircle className={style.icon} />
        <span></span>
      </Link>
    </div>
  );
};
