import { CompanyWrapper } from "..";

import style from "./CompanyProfile.module.css";

export const CompanyProfile = ({ client, companys }) => {
  return (
    <>
      {companys
        .filter((company) => client.id === company.clientId)
        .map((company) => (
          <div className={style.buttonEnterprise} key={company.id}>
            <CompanyWrapper.Content company={company} />
          </div>
        ))}
    </>
  );
};
