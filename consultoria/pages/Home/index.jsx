import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./home.module.css";
import docs from "../../src/assets/docs.svg";
import adm from "../../src/assets/iconuser.svg";
import client from "../../src/assets/client.svg";
import profile from "../../src/assets/profileIcon.png";
import out from "../../src/assets/out.svg";
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
            <FaUserAlt className={style.icon} />
          </div>

          <p>Olá, {auth.user?.name}</p>
        </div>

        <div className={style.links}>
          <Link to="/client" className={style.options}>
            <img src="../../src/assets/client.svg" alt="" srcset="" />
            Lista de clientes
          </Link>

          <Link to="/DocumentsPage" className={style.options}>
            <img src="../../src/assets/docs.svg" alt="" srcset="" />
            Documentos
          </Link>

          <Link to="/Adm" className={style.options}>
            <img src="../../src/assets/iconuser.svg" alt="" srcset="" />
            Área Adm
          </Link>
        </div>

        <button onClick={handleLogout} className={style.logout}>
          <img src={out} alt="" />
          sair
        </button>
      </div>
    </section>
  );
};

export default Home;
