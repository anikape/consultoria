import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import home from '../../src/assets/home.png';
import userAdd from '../../src/assets/useradd.png';
import userEdit from '../../src/assets/useredit.png';
import del from '../../src/assets/delete.png';
import user2 from '../../src/assets/user2.png';
import style from './adm.module.css';
import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import axios from 'axios';

const Index = () => {
  const auth = useContext(AuthContext);


  const [userData, setUserData] = useState(null);

  const admData = {
    id: 1,
    name: "Florencia",
    email: "florencia2@gmail.com",
    cpf: "12345678900",
    img: user2
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
  const [formData, setFormData] = useState(admData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
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
                <Link className={style.links} to="/Home"><img src={home} alt="Home" />Home</Link>
              </li>
              <li>
                <button className={style.links} onClick={handleEditClick}><img src={userEdit} alt="Editar" />Editar</button>
              </li>
              <li>
                <Link className={style.links}><img src={del} alt="Excluir" />{''}Excluir</Link>
              </li>
              <li>
                <Link className={style.links} to="/CadastroAdm"><img src={userAdd} alt="Novo Usuário" /> Novo Usuário</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={style.userData}>
          <h2>Dados do cadastro</h2>
          <img src={formData.img} alt="Imagem do usuário" />
          <form className={style.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" value={formData.name} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} disabled={!isEditing} />
            </div>
            {isEditing && <button className={style.links} type="submit">Salvar</button>}
          </form>
        </div>
      </section>
    </section>
  );
};

export default Index;
