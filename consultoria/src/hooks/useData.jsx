import { useState, useEffect } from "react";
import { api } from "../../services/api";

export const useData = (configRequest) => {
  const { method, url, configs = {} } = configRequest;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);

    try {
      const response = await api[method.toLowerCase()](url, {
        ...configs,
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Não foi possível obter os dados");
      }

      setData(response.data);
      console.log(data);
    } catch ({ message }) {
      console.log(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return [data, loading, error];
};
