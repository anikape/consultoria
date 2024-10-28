import { CompanysList } from "@components/CompanysList";

import style from "@components/CompanysList/Profile/CompanyProfile.module.css";

export const Profile = ({ client, companys }) => {
  console.log(companys);
  return (
    <>
      {companys
        ?.filter((company) => client.id === company.clientId)
        .map((company) => (
          <div className={style.buttonEnterprise} key={company.id}>
            <CompanysList.Content company={company} />
          </div>
        ))}
    </>
  );
};
