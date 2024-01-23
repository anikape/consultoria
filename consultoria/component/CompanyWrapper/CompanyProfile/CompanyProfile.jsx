import { useData } from "../../../src/hooks/useData";

import { CompanyWrapper } from "..";
import { Loading } from "../../Loading";

import style from "./CompanyProfile.module.css";

export const CompanyProfile = ({ client }) => {
  const [companys, loading, error] = useData({
    method: "GET",
    url: "company",
  });

  console.log(companys, loading, error);
  console.log(client);

  return (
    <>
      {companys
        .filter((company) => client.id === company.clientId)
        .map((company) => (
          <div className={style.buttonEnterprise} key={company.id}>
            {loading ? (
              <Loading />
            ) : (
              <CompanyWrapper.Content company={company} />
            )}
          </div>
        ))}
    </>
  );
};
