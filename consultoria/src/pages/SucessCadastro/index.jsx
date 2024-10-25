import { Link } from "react-router-dom";
import logo from "@/assets/logo1.png";
import check from "@/assets/check.png";
import Footer from "@/components/Footer";
import style from "@/pages/SucessCadastro/sucessCadastro.module.css";

const SucessCadastro = () => {
  return (
    <section className={style.sucessContainer}>
      <div className={style.sucessContent}>
        <img src={logo} alt="" />

        <div className={style.checkConatiner}>
          <img className={style.check} src={check} alt="" />
        </div>

        <h4>Sucesso!</h4>

        <p>Cadastro alterado com sucesso.</p>

        <Link className={style.link} to="/adm">
          Sair
        </Link>
      </div>

      <Footer />
    </section>
  );
};

export default SucessCadastro;