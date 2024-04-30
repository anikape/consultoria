import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import style from "./password.module.css";
import logo from "../../src/assets/logo1.png";
import info from "../../src/assets/info.png";
import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";
import { useFetch } from "../../src/hooks/useFetch";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, _] = useSearchParams();
  const tokenAuthorization = token.get("token");
  const { getData } = useFetch();

  const [loading, setLoading] = useState(false);
  const [hasAuthorization, setHasAuthorization] = useState(false);

  console.table(id, token.get("token"));

  const getAuthorization = async (id) => {
    setLoading(true);
    try {
      const response = await getData(
        `/admin/reset-password/${id}?token=${tokenAuthorization}`
      );

      if (!response.status === 200) {
        setLoading(false);
        setHasAuthorization(false);
        throw new Error("Não autorizado");
      }
      setHasAuthorization(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorization(id);
    if (hasAuthorization) {
      navigate("/redefine");
    }
    navigate("/password", { state: { id } });
  }, [getAuthorization, hasAuthorization]);

  return (
    <section className={style.passContainer}>
      {loading && (
        <>
          <div>{<LoadingSpinner />}</div>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
