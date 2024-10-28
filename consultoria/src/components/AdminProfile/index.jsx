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

const AdminProfile = () => {
  const auth = useContext(AuthContext);
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
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para salvar no banco de dados
    setIsEditing(false);
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
                  {""}Excluir
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
          <form className={style.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={admin?.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={admin?.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                value={admin?.cpf ? admin?.cpf : "CPF não cadastrado"}
                onChange={handleChange}
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
