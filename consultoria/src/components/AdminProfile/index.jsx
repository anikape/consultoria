import { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import home from "@/assets/home.png";
import userAdd from "@/assets/useradd.png";
import userEdit from "@/assets/useredit.png";
import del from "@/assets/delete.png";
import user2 from "@/assets/user2.png";

import { AuthContext } from "@contexts/Auth/AuthContext";

import { useFetch } from "@hooks/useFetch";
import { useAdmin } from "@hooks/useAdmin";

import style from "@components/AdminProfile/adm.module.css";

const AdminProfile = () => {
  const auth = useContext(AuthContext);
  const { admin, addAdmin, removeAdmin, editAdmin, loadAdmin } = useAdmin();

  const { getData } = useFetch();
  const { register, handleSubmit } = useForm();

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

      loadAdmin(response.data);
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

  // useEffect(() => {
  //   // Função para buscar os dados do usuário do backend
  //   const fetchUserData = async () => {
  //     try {
  //       // Faça uma solicitação ao seu backend para obter os dados do usuário logado
  //       const response = await axios.get('/api/user'); // Substitua '/api/user' pela rota real da sua API
  //       setUserData(response.data); // Defina os dados do usuário no estado
  //     } catch (error) {
  //       console.error('Erro ao buscar dados do usuário:', error);
  //     }
  //   };

  //   // Chame a função para buscar os dados do usuário ao montar o componente
  //   fetchUserData();
  // }, []);

  const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState(admData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    // const { id, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [id]: value,
    // }));
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className={style.admContainer}>
      <section className={style.admContent}>
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
                <button className={style.links} onClick={handleEditClick}>
                  <img src={userEdit} alt="Editar" />
                  Editar
                </button>
              </li>
              <li>
                <Link className={style.links}>
                  <img src={del} alt="Excluir" />
                  Excluir
                </Link>
              </li>
              <li>
                <Link className={style.links} to="/CadastroAdm">
                  <img src={userAdd} alt="Novo Usuário" /> Novo Usuário
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={style.userData}>
          <h2 className={style.h2}>Dados do cadastro</h2>
          {/* <img src={auth.user?.img} alt="Imagem do usuário" /> */}
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                defaultValue={admin?.name}
                disabled={!isEditing}
                {...register("nome")}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                defaultValue={admin?.email}
                {...register("email")}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                defaultValue={admin?.cpf}
                {...register("cpf")}
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <button className={style.links} type="submit">
                Salvar
              </button>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export { AdminProfile };
