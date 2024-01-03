import style from "./ClientBox.module.css";
import { FaInfoCircle } from "react-icons/fa";

export const ClientBox = ({ client, children }) => {
  return (
    <>
      <button className={style.buttonName} onClick={() => openModal(client)}>
        {client.name} <FaInfoCircle className={style.icon} />
      </button>
      {/* <div className={style.contentClient}> */}
      {/* {companys.map((company) => (
              <>
                <CompanyProfile company={company} key={company._id} />
              </>
            ))} */}
      {/* {children} */}
      {/* </div> */}
    </>
  );
};
