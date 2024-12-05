import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import home from '@/assets/home.png';
import userAdd from '@/assets/useradd.png';
import userEdit from '@/assets/useredit.png';
import del from '@/assets/delete.png';

import { AuthContext } from '@contexts/Auth/AuthContext';
import { useFetch } from '@hooks/useFetch';

import style from '@components/AdminProfile/adm.module.css';

import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext);
  const { admin, addAdmin, removeAdmin, editAdmin, loadAdmin } = useAdmin();
  
  

  const { getData } = useFetch();
  const { register, handleSubmit, setValue } = useForm();

  const adminUser = auth.user?.id;
  
  
  

  console.log(admin);

  // Função para carregar os dados do usuário
  const loadData = async () => {
    try {
      // setLoading(true);
      const response = await getData(`admin/${auth.user?.id}`);
      if (response.status === 200) {
        // setOriginalData(response.data); // Salva os dados originais
        // reset(response.data); // Preenche o formulário com os dados
      } else {
        // setFeedback('Erro ao carregar os dados do administrador.');
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      // setFeedback('Erro ao buscar dados. Tente novamente.');
    } finally {
      // setLoading(false);
    }
  };

  // Carrega os dados ao montar o componente
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

  const handleEditClick = (user) => {
    setIsEditing(true);
    // setIsEditing(false);
    setValue("name", user.name);
    setValue("cpf", user.cpf);
    setValue("email", user.email);
  };

  const handleChange = (user) => {
    // setEditable(true);
    // const { id, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [id]: value,
    // }));
  };

  // Função para cancelar as alterações
  const handleCancelClick = () => {
    // reset(originalData); // Restaura os dados originais no formulário
    // setIsEditing(false); // Sai do modo de edição
    // setFeedback(''); // Limpa a mensagem de feedback
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
                <button
                  className={style.links}
                  onClick={() => handleEditClick(auth.user)}
                >
                  <img src={userEdit} alt="Editar" />
                  Editar
                </button>
              </li>
              <li>
                <button
                  className={style.links}
                  onClick={() => alert('Função de exclusão implementada!')}
                >
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
          {feedback && <p className={style.feedback}>{feedback}</p>}
          {loading && <p>Carregando...</p>}
          <form className={style.form} onSubmit={handleSubmit(handleSaveClick)}>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                defaultValue={admin?.name}
                disabled={!isEditing}
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                {...register('cpf', { required: true })}
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <div className={style.buttonGroup}>
                <button className={style.saveButton} type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  className={style.cancelButton}
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export { AdminProfile };
