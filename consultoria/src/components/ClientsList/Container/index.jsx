import { useEffect } from "react";
import { useData } from "@hooks/useData";
import { ClientsList } from "@components/ClientsList";
import { CompanysList } from "@components/CompanysList";
import { Loading } from "@components/Loading";
import { useCompany } from "@hooks/useCompany";

export const Container = ({ clients }) => {
  const { data, loading, error, request } = useData();
  const { companyList, loadCompanys } = useCompany();

  const loadData = async () => {
    const response = await request("get", "company", { withCredentials: true });
    await loadCompanys(response.json);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (companyList === null) {
    return null;
  }

  return (
    <>
      {clients?.map((client) => (
        <ClientsList.Content key={client.id}>
          <ClientsList.Button client={client} key={client.id} />
          <ClientsList.Company>
            {!loading && (
              <CompanysList.Profile client={client} companys={companyList} />
            )}
          </ClientsList.Company>
        </ClientsList.Content>
      ))}
    </>
  );
};
