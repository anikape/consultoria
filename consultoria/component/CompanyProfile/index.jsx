import { useState } from "react";
import { Link } from "react-router-dom";
import { mask } from "../../src/helpers/maskValues";
import style from "./CompanyProfile.module.css";

const CompanyProfile = ({ company }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        key={company._id}
        className={style.buttonEntreprise}
        onClick={() => setShow(!show)}>
        {/* {enterprise.razaoSocial}{" "} */}

        <div className={style.companyNameWrapper}>
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
                <p> {mask.Phone(company.phone)}</p>
              </div>
              <div className={style.infoEnterprise}>
                <p className={style.infoName}>CPF/CNPJ:</p>
                <p> {company.cnpj}</p>
              </div>
            </div>

            <Link to={`/entrepriseProfile/${"enterprise.cpfCnpj"}`}>
              <button className={style.buttonProfile}>PERFIL</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyProfile;
