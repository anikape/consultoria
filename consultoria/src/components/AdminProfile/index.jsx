import { useState, useEffect, useContext, useReducer } from "react";

import { AuthContext } from "@contexts/Auth/AuthContext";
import { useFetch } from "@hooks/useFetch";
import { useAdmin } from "@hooks/useAdmin";
import style from "@components/AdminProfile/AdminProfile.module.css";

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const { admin, loadAdmin } = useAdmin();
  const { getData } = useFetch();

  const userId = auth.user?.id;

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getData(`admin/${userId}`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Erro ao carregar dados");
      }

      await loadAdmin([response.data]);
      setLoading(false);
      console.log(response);
    } catch (error) {
      loadAdmin([]);
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log(admin);
  console.log(auth.user);
  console.log(admin.length);

  if (loading && !admin) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={style.userData}>
      {loading && !admin && <p>Carregando...</p>}
      <div className={style.userDataInfo}>
        {!loading &&
          admin?.map(item => (
            <div key={admin?.id} className={style.userDataInfoItem}>
              <div>
                <p>Nome:</p>
                <p>{item.name}</p>
              </div>
              <div>
                <p>CPF:</p>
                <p>{item.cpf ?? "CPF não cadastrado"}</p>
              </div>
              <div>
                <p>Email:</p>
                <p>{item.email}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export { AdminProfile };
