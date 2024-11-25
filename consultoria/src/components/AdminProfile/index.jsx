import { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import home from "@/assets/home.png";
import userAdd from "@/assets/useradd.png";
import userEdit from "@/assets/useredit.png";
import del from "@/assets/delete.png";
import user2 from "@/assets/user2.png";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import style from "@components/AdminProfile/adm.module.css";
import { useAdmin } from "@/hooks/useAdmin";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { admin, addAdmin, removeAdmin, editAdmin, loadAdmin } = useAdmin();
  const { getData } = useFetch();

  const adminUser = auth.user?.id;

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
      loadAdmin();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const [userData, setUserData] = useState(null);
  const admData = {
    id: 1,
    name: auth.user?.name,
    email: auth.user?.email,
    cpf: auth.user?.cpf,
    img: auth.user?.img,
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleSaveClick = data => {
    console.log(data);
  };

  const handleCancelEdit = () => setIsEditing(false);

  const handleEditClick = user => {
    setIsEditing(true);

    setValue("name", user.name);
    setValue("cpf", user.cpf);
    setValue("email", user.email);
  };

  return (
    <section className={style.admSection}>
      <div className={style.admContainer}>
        <div className={style.admContent}>
          <div className={style.admNav}>
            <nav className={style.nav}>
              <ul>
                <li>
                  <Link className={style.links} to="/Home">
                    <img src={home} alt="Home" />
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    className={style.links}
                    onClick={() => handleEditClick(auth.user)}>
                    <img src={userEdit} alt="Editar" />
                    Editar
                  </button>
                </li>
                <li>
                  <button
                    className={style.links}
                    onClick={() => alert("Função de exclusão implementada!")}>
                    <img src={del} alt="Excluir" />
                    Excluir
                  </button>
                </li>
                <li>
                  <Link className={style.links} to="/CadastroAdm">
                    <img src={userAdd} alt="Novo Usuário" />
                    Novo Usuário
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={style.userData}>
            <h2 className={style.h2}>Dados do cadastro</h2>
            {/* {feedback && <p className={style.feedback}>{feedback}</p>} */}
            {loading && <p>Carregando...</p>}
            <form
              className={style.form}
              onSubmit={handleSubmit(handleSaveClick)}>
              <div className={style.formItem}>
                <label htmlFor="name">Nome:</label>
                <input
                  id="name"
                  defaultValue={admin?.name}
                  disabled={!isEditing}
                  {...register("name", { required: "Campo obrigatório" })}
                />
                <p className={style.errorMessage}>{errors.name?.message}</p>
              </div>
              <div className={style.formItem}>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Campo obrigatório" })}
                  disabled={!isEditing}
                />
                <p className={style.errorMessage}>{errors.email?.message}</p>
              </div>
              <div className={style.formItem}>
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  {...register("cpf", { required: "Campo obrigatório" })}
                  disabled={!isEditing}
                />
                <p className={style.errorMessage}>{errors.cpf?.message}</p>
              </div>
              {isEditing && (
                <div className={style.buttonGroup}>
                  <Button variant={"confirm"} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                  </Button>

                  <Button variant={"cancel"} onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AdminProfile };
