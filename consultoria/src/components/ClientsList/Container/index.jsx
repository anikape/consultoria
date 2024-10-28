import { useEffect } from "react";
import { useData } from "@hooks/useData";
import { ClientsList } from "@components/ClientsList";
import { CompanysList } from "@components/CompanysList";
import { Loading } from "@components/Loading";
import { useCompany } from "@hooks/useCompany";

export const Container = ({ clients }) => {
  const { data, loading, error, request } = useData();
  const { companys, loadCompanys } = useCompany();

  const loadData = async () => {
    const response = await request("get", "company", { withCredentials: true });
    const companysList = response.json;
    // console.log(response);
    // console.log(companys);

    await loadCompanys(companysList);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (companys === null) {
    return null;
  }

  return (
    <>
      {clients?.map((client) => (
        <ClientsList.Content key={client.id}>
          <ClientsList.Button client={client} key={client.id} />
          <ClientsList.Company>
            {!loading && (
              <CompanysList.Profile client={client} companys={companys} />
            )}
          </ClientsList.Company>
        </ClientsList.Content>
      ))}
    </>
  );
};
