import { Link } from "react-router-dom";
import { mask } from "@/helpers/maskValues";
import { Popper } from "@/components/Popper";

import style from "@components/CompanysList/Content/CompanyProfileContent.module.css";

export const Content = ({ company }) => {
  return (
    <>
      <Popper.Body>
        <Popper.Button>
          <p>{company.companyName}</p>
        </Popper.Button>
        <Popper.Content>
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
                to={`/entrepriseProfile/${company.id}`}
                className={style.buttonProfile}
              >
                PERFIL
              </Link>
            </div>
          </div>
        </Popper.Content>
      </Popper.Body>
    </>
  );
};
