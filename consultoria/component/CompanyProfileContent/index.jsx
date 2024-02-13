import { useState } from "react";
import { Link } from "react-router-dom";
import { mask } from "../../src/helpers/maskValues";
import style from "./CompanyProfileContent.module.css";

export const CompanyProfileContent = ({ company }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={style.companyNameWrapper} onClick={() => setShow(!show)}>
        <p>{mask.CNPJ(company.cnpj)}</p>
        <p>{show ? "▲" : "▼"}</p>
      </div>
      {show && (
        <div className={style.infoEnterpriseContainer}>
          <div className={style.infoEnterpriseWrapper}>
            <div className={style.infoEnterprise}>
              <p className={style.infoName}>Nome Completo/Razão Social:</p>
              <p> {company.companyName}</p>
            </div>
            <div className={style.infoEnterprise}>
              <p className={style.infoName}>E-mail:</p>
              <p> {company.email}</p>
            </div>
          </div>
          <div className={style.infoEnterpriseWrapper}>
            <div className={style.infoEnterprise}>
              <p className={style.infoName}>Telefone celular:</p>
              <p> {mask.Phone(`00${company.phone}`)}</p>
            </div>
            <div className={style.infoEnterprise}>
              <p className={style.infoName}>CPF/CNPJ:</p>
              <p>{mask.CNPJ(company.cnpj)}</p>
            </div>
          </div>
          <div className={style.companyButtonsWrapper}>
            <Link
              to={`/entrepriseProfile/${"company._id"}`}
              className={style.buttonProfile}>
              PERFIL
            </Link>

            <Link
              to={`/entrepriseProfile/${"company._id"}`}
              className={style.buttonProfile}>
              EDITAR
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
