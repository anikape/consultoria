import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import style from "./ClientBox.module.css";
import CompanyProfile from "../CompanyProfile";

const ClientBox = ({ clients, companys }) => {
  return (
    <>
      {clients.map((client) => (
        <div key={client._id} className={style.clientList}>
          <button
            className={style.buttonName}
            onClick={() => openModal(client)}>
            {client.name} <FaInfoCircle className={style.icon} />
          </button>
          <div className={style.contentClient}>
            {companys.map((company) => (
              <>
                <CompanyProfile company={company} />
              </>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientBox;
