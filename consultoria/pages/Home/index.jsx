import {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./home.module.css";
import docs from "../../src/assets/docs.svg";
import user from "../../src/assets/iconuser.svg";
import client from "../../src/assets/client.svg";
import profile from "../../src/assets/profileIcon.png";
import { IoLogOut } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { AuthContext } from "../../src/contexts/Auth/AuthContext";

import Footer from "../../component/Footer";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  };

  return (
  <>
  <main className={style.home}>
    
    <section className={style.sectionHome}>
      <div className={style.containerHome}>
      <div className={style.content}>
        <div className={style.info}>
          <div className={style.iconWrapper}>
            <FaUserAlt className={style.icon} />
          </div>

          <p>Olá, {auth.user?.name}</p>
        </div>

        <div className={style.links}>
          <Link to="/client" className={style.options}>
            <img src={client} alt="Lista de clientes" />
            Lista de clientes
          </Link>

          <Link to="/DocumentsPage" className={style.options}>
            <img src={docs} alt="Documentos" />
            Documentos
          </Link>

          <Link to="/Adm" className={style.options}>
            <img src={user} alt="Área adm" />
            Área Adm
          </Link>
        </div>

        <button onClick={handleLogout} className={style.logout}>
          <IoLogOut />
        </button>
      </div>
      </div>

          
    </section>
  <Footer />
  </main>
        
        
        </>
  );
};

export default Home;
