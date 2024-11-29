import { useState, useEffect, useContext, useReducer } from "react";

import { AuthContext } from "@contexts/Auth/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { useAdmin } from "@/hooks/useAdmin";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";

import style from "@components/Forms/AdminForm/AdminForm.module.css";

const AdminForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { adminList, loadAdmin } = useAdmin();
  const { getData, editData } = useFetch();

  const adminUser = auth.user?.id;
  console.log(adminList);

  const loadData = async () => {
    try {
      const response = await getData(`admin/${adminUser}`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status !== 200) {
        return;
      }

      loadAdmin(response.data);
    } catch ({ message }) {
      setMessage(message);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async data => {
    const cpfCleaned = data.cpf.replace(/[^\d]+/g, "");
    try {
      const response = await editData(`/admin/${adminUser}`, {
        ...data,
        cpf: cpfCleaned,
      });
      if (response.status !== 200) {
        throw new Error("Não foi possível alterar os dados");
      }
      setMessage("Dados salvos com sucesso");
    } catch ({ message }) {
      setMessage(message);
    }
    console.log(data, cpfCleaned);
  };

  return (
    <div className={style.userData}>
      <h2 className={style.h2}>Dados do cadastro</h2>
      {message && <p className={style.feedback}>{message}</p>}
      {loading && <p>Carregando...</p>}
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formItem}>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            defaultValue={adminList?.name}
            {...register("name", { required: "Campo obrigatório" })}
          />
          <p className={style.errorMessage}>{errors.name?.message}</p>
        </div>
        <div className={style.formItem}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            defaultValue={adminList?.email}
            {...register("email", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "O e-mail deve ser válido",
              },
            })}
          />
          <p className={style.errorMessage}>{errors.email?.message}</p>
        </div>
        <div className={style.formItem}>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            defaultValue={adminList?.cpf}
            {...register("cpf", {
              required: "Campo obrigatório",
              pattern: {
                value: /^(?!000|111|222|333|444|555|666|777|888|999)(\d{11})$/,
                message:
                  "CPF inválido. Use apenas números (sem pontos e traços).",
              },
            })}
          />
          <p className={style.errorMessage}>{errors.cpf?.message}</p>
        </div>

        <div className={style.buttonGroup}>
          <Button variant={"confirm"} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { AdminForm };
