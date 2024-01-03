import { useData } from "../../src/hooks/useData";
import { CompanyProfileContent } from "../../component/CompanyProfileContent";

import style from "./CompanyProfile.module.css";
import { Loading } from "../Loading";

export const CompanyProfile = ({ client }) => {
  const [companys, loading, error] = useData({
    method: "GET",
    url: "company",
  });
  return (
    <>
      {companys
        .filter((company) => client._id === company.clientId)
        .map((company) => (
          <div className={style.buttonEnterprise} key={company._id}>
            {loading ? (
              <Loading />
            ) : (
              <CompanyProfileContent company={company} />
            )}
          </div>
        ))}

      {/* <div className={style.buttonEnterprise}>
        <div
          className={style.companyNameWrapper}
          onClick={() => setShow(!show)}>
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
                to={`/entrepriseProfile/${"enterprise.cpfCnpj"}`}
                className={style.buttonProfile}>
                PERFIL
              </Link>
              <Link
                to={`/entrepriseProfile/${"enterprise.cpfCnpj"}`}
                className={style.buttonProfile}>
                EDITAR
              </Link>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};
