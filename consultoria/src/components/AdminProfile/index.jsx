import { useState, useEffect, useContext, useReducer } from "react";

import { AuthContext } from "@contexts/Auth/AuthContext";
import { useFetch } from "@hooks/useFetch";
import style from "@components/AdminProfile/AdminProfile.module.css";
import { useAdmin } from "@hooks/useAdmin";

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const { admin, addAdmin, removeAdmin, editAdmin, loadAdmin } = useAdmin();
  const { getData } = useFetch();

  const loadData = async () => {
    try {
      const response = await getData(
        `admin/${auth.user?.id}`,
        { password: "admin" },
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        return;
      }
      loadAdmin([response.data]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log(admin);

  return (
    <section className={style.admSection}>
      <div className={style.admContainer}>
        <div className={style.admContent}>
          <div className={style.userData}>
            {admin?.map(item => (
              <div key={admin.id} className={style.userDataItem}>
                <div>
                  <p>Nome:</p>
                  <p>{item.name}</p>
                </div>
                <div>
                  <p>CPF:</p>
                  <p key={admin.id}>{item.cpf ?? "CPF não cadastrado"}</p>
                </div>
                <div>
                  <p>Email:</p>
                  <p key={admin.id}>{item.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { AdminProfile };
