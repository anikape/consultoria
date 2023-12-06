import React from 'react';
import { Link } from 'react-router-dom';
import style from './adm.module.css'

const Index = () => {
  return (
    <section className={style.admContainer}>
      <h1>Página Index</h1>
      <Link to="/CadastroAdm">
        <button>Ir para outra página</button>
      </Link>
    </section>
  );
};

export default Index;
