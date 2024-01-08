import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/logo1.png";
import check from "../../src/assets/check.png";
import Footer from "../../component/Footer";
import style from "./sucessCadastro.module.css";

const SucessCadastro = () => {
  return (
    <section className={style.sucessContainer}>
      <div className={style.sucessContent}>
        <img src={logo} alt="" />

        <div className={style.checkConatiner}>
          <img className={style.check} src={check} alt="" />
        </div>

        <h4>Sucesso!</h4>

        <p>Cadastro alterad com sucesso.</p>

        <Link className={style.link} to="/adm">
          Sair
        </Link>
      </div>

      <Footer />
    </section>
  );
};

export default SucessCadastro;
