import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./home.module.css";
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
      <section className={style.content}>
        <div className={style.info}>
          <FaUserAlt className={style.icon} />

          <p>Olá, {auth.user?.name}</p>
        </div>

        <div className={style.links}>
          <Link to="/client" className={style.options}>
            <FaTasks /> Lista de clientes
          </Link>

          <Link to="/DocumentsPage" className={style.options}>
            <FaNewspaper />
            Documentos
          </Link>

          <Link to="" className={style.options}>
            <FaUsers />
            Área Adm
          </Link>
        </div>

        <button onClick={handleLogout} className={style.logout}>
          <BiLogOut /> sair
        </button>
      </section>
    </section>
  );
};

export default Home;
