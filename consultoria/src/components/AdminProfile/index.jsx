import { useEffect, useContext } from "react";

import { AuthContext } from "@contexts/Auth/AuthContext";

import { useAdmin } from "@hooks/useAdmin";
import { useData } from "@hooks/useData";

import style from "@components/AdminProfile/AdminProfile.module.css";
import LoadingSpinner from "../LoadingSpinner";

const AdminProfile = () => {
  const auth = useContext(AuthContext);
  const { adminList, loadAdmin } = useAdmin();
  const { loading, error, request } = useData();

  const userId = auth.user?.id;

  const loadData = async () => {
    try {
      const { response, json } = await request("get", `admin/${userId}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Erro ao carregar dados");
      }

      const adminRegistered = [json];
      loadAdmin(adminRegistered);
    } catch (error) {
      loadAdmin([]);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={style.userData}>
      <div className={style.userDataInfo}>
        {loading && <LoadingSpinner />}
        {!loading && adminList.length <= 0 && <p>Nenhum dado cadastrado</p>}
        {!loading &&
          adminList?.map(item => (
            <div key={item.id} className={style.userDataInfoItem}>
              <span>
                <p>Nome:</p>
                <p>{item.name}</p>
              </span>
              <span>
                <p>CPF:</p>
                <p>{item.cpf ?? "CPF não cadastrado"}</p>
              </span>
              <span>
                <p>Email:</p>
                <p>{item.email}</p>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export { AdminProfile };
