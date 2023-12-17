import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./home.module.css";
import docs from '../../src/assets/docs.svg'
import adm from '../../src/assets/iconuser.svg'
import client from '../../src/assets/clint.svg'
import profile from '../../src/assets/profileIcon.png'
import { FaUserAlt, FaTasks, FaNewspaper, FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../../src/hooks/useAuth";
import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import DocumentsPage from "../DocumentsPage/DocumentsPage";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToDocumentsPage = () => {
    // Use a função navigate para navegar para DocumentsPage e passe a lista de clientes como estado
    navigate("/DocumentsPage", { state: { clients } });
  };

  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  };

  return (
    <section className={style.containerHome}>
      <div className={style.content}>
        <div className={style.info}>
          <div className={style.iconWrapper}>
            <img src={profile} className={style.icon} />
          </div>

          <p>Olá, {auth.user?.name}</p>
        </div>

        <div className={style.links}>

          <div className={style.hover1}>
          <Link  to="/client" className={style.options}>
          <img id='link1' src={client} alt='Documentos'/> Lista de clientes
          </Link>
          </div>

          <div className={style.hover1}>
          <Link to="/DocumentsPage" className={style.options}>
            <img src={docs} alt='Documentos'/>
            Documentos
          </Link>
          </div>

          <div className={style.hover1}>
          <Link to="/Adm" className={style.options}>
          <img className={style.svg} src={adm} alt='Documentos'/>
            Área Adm
          </Link>
          </div>
        </div>

        <button onClick={handleLogout} className={style.logout}>
          <BiLogOut /> sair
        </button>
      </div>
    </section>
  );
};

export default Home;
