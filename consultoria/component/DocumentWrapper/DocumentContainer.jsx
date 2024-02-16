import { Link } from "react-router-dom";
import { formatDate } from "../../src/helpers/formatDate";
import { documentType } from "../../src/helpers/documentType";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Loading } from "../Loading";
import { Popper } from "../Popper";
import { useState } from "react";
import style from "./DocumentWrapper.module.css";

export const DocumentContainer = ({ document, loading }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Popper.Button show={show} setShow={setShow}>
            {document.type} - {documentType(document.type)}
          </Popper.Button>
          <Popper.Content show={show}>
            <div className={style.infoEnterpriseWrapper}>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Nome da empresa:</p>
                <p>{document.companyName}</p>
              </div>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Nome do Arquivo:</p>
                <p>{document.name}</p>
              </div>
            </div>

            <div className={style.infoEnterpriseWrapper}>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Emissao:</p>
                <p>{formatDate(document.emission)}</p>
              </div>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>Vencimento:</p>
                <p>{formatDate(document.validity)}</p>
              </div>
            </div>
            <div className={style.infoEnterpriseWrapper}>
              <Link to={document.url} target="_blank" download>
                <div className={style.button}>
                  <AiOutlineFilePdf />
                  Abrir arquivo
                </div>
              </Link>
              <div>
                <button
                  className={style.button}
                  onClick={() => handleDeleteDocument(document.id)}>
                  Excluir Documento
                </button>
              </div>
            </div>
          </Popper.Content>
        </>
      )}
    </>
  );
};
