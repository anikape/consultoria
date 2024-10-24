import { useEffect } from "react";
import { useData } from "@hooks/useData";
import { ClientsList } from "@components/ClientsList";
import { CompanysList } from "@components/CompanysList";
import { Loading } from "@components/Loading";

export const Container = ({ data }) => {
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
        <ClientsList.Content key={client.id}>
          <ClientsList.Button client={client} key={client.id} />
          <ClientsList.Company>
            <CompanysList.Profile client={client} companys={companys} />
          </ClientsList.Company>
        </ClientsList.Content>
      ))}
    </>
  );
};
