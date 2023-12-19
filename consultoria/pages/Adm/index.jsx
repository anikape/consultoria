import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../src/assets/home.png';
import userAdd from '../../src/assets/useradd.png';
import userEdit from '../../src/assets/useredit.png';
import del from '../../src/assets/delete.png';
import user2 from '../../src/assets/user2.png';
import style from './adm.module.css';

const Index = () => {
  const adm = [
    {
      id: 1,
      name: "Florencia",
      email: "florencia2@gmail.com",
      cpf: "12345678900",
      img: user2
    }
  ];

  const renderUserData = () => {
    if (adm.length === 0) {
      return <p>Nenhum dado encontrado</p>;
    }

    const { name, email, cpf, img } = adm[0]; // Considerando apenas o primeiro item da lista de adm

    return (
      <div className={style.userData}>
        <h2>Dados do cadastro</h2>
        <img src={img} alt="Imagem do usuário" />
        <form className={style.form}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" value={name} readOnly />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} readOnly />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" value={cpf} readOnly />
          </div>
        </form>
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
                <Link className={style.links} to="/Home"><img src={home} alt="Home" />Home</Link>
              </li>
              <li>
                <Link className={style.links}><img src={userEdit} alt="Editar" />Editar</Link>
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

        {renderUserData()}
      </section>
    </section>
  );
};

export default Index;
