import {useEffect} from "react";
import { useData } from "../../../src/hooks/useData";
import { ClientWrapper } from "../../ClientWrapper";
import { CompanyWrapper } from "../../CompanyWrapper";
import { Loading } from "../../Loading";

export const ClientContainer = ({ data }) => {
  const { ["data"]: companys, loading, error, request } = useData();

  useEffect(() => {
    request("get", "company", { withCredentials: true });
  }, [request]);

  if (loading) {
    return <Loading />;
  }

  if (companys === null) {
    return null;
  }
  
  return (
    <>
      {data.map((client) => (
        <ClientWrapper.Content key={client.id}>
          <ClientWrapper.Button client={client} key={client.id} />
          <ClientWrapper.Company>
            <CompanyWrapper.Company client={client} companys={companys} />
          </ClientWrapper.Company>
        </ClientWrapper.Content>
      ))}
    </>
  );
};
