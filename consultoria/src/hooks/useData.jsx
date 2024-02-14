import { useState, useCallback, useEffect } from "react";
import { api } from "../../services/api";

export const useData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const request = useCallback(async (method, url, configs = {}) => {
    let json;
    let response;
    try {
      setError(null);
      setLoading(true);
      response = await api[method.toLowerCase()](url, {
        ...configs,
      });

      if (response.status !== 200) {
        throw new Error("Não foi possível obter os dados");
      }
      json = response.data;

      setData(json);
    } catch ({ message }) {
      setError(message);
      setData([]);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  useEffect(() => {
    request();
  }, []);

  return { data, loading, error, request };
};
