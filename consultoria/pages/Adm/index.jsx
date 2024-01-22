import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import { useContext } from "react";
import home from '../../src/assets/home.png';
import userAdd from '../../src/assets/useradd.png';
import userEdit from '../../src/assets/useredit.png';
import del from '../../src/assets/delete.png';
import user2 from '../../src/assets/user2.png';
import style from './adm.module.css';

const Index = () => {

  const auth = useContext(AuthContext);

  const [user, setUser] = useState({
    id: 1,
    name: "Florencia",
    email: "florencia2@gmail.com",
    cpf: "12345678900",
    img: user2
  });

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setNewUsername(auth.user.name);
    setNewEmail(auth.user.email);
    setNewCpf(auth.user.cpf);
  }, [auth.user]);

  // Função para editar o formulário
  const handleUpdateUser = async () => {
    try {
      const backendURL = 'localhost:3003/admin'; // Substitua com a URL do seu back-end
      const response = await fetch(`${backendURL}/edit_user/${auth.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          cpf: newCpf,
        }),
      });

      if (response.ok) {
        auth.setUser({
          ...auth.user,
          name: newUsername,
          email: newEmail,
          cpf: newCpf,
        });
        setNewUsername('');
        setNewEmail('');
        setNewCpf('');
        setIsEditMode(false);
        console.log('Usuário atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar usuário');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const renderUserData = () => {
    return (
      <div className={style.userData}>
        <h2>Dados do cadastro</h2>
        <img src={auth.user.img} alt="Imagem do usuário" />
        <form className={style.form}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={newUsername}
              readOnly={!isEditMode}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={newEmail}
              readOnly={!isEditMode}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={newCpf}
              readOnly={!isEditMode}
              onChange={(e) => setNewCpf(e.target.value)}
            />
          </div>
        </form>
        {isEditMode && (
          <button type="button" onClick={handleUpdateUser}>
            Salvar
          </button>
        )}
        {!isEditMode && (
          <button type="button" onClick={() => setIsEditMode(true)}>
            Editar
          </button>
        )}
      </div>
    );
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
                <Link className={style.links}>
                  <img src={del} alt="Excluir" />
                  Excluir
                </Link>
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
        {renderUserData()}
      </section>
    </section>
  );
};

export default Index;
