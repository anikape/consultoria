import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

export const useData = () => {
  const { getData } = useFetch();
  const [client, setClients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, serError] = useState(null);

  const getClients = async () => {
    setLoading(true);

    try {
      const { data, status } = await getData("/client");
      console.log(data, loading);

      if (status !== 200) {
        throw new Error("Não foi possível obter os dados");
      }
      console.log(data);
      setClients(data);
      console.log(data);
      console.log(loading);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return { client, loading };
};
