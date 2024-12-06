import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import docs from "@/assets/docs.svg";
import user from "@/assets/iconuser.svg";
import client from "@/assets/client.svg";
import { IoLogOut } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import { AuthContext } from "@/contexts/Auth/AuthContext";

import Footer from "@/components/Footer";

import style from "@/pages/Home/home.module.css";

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

                <Link to="/AdminAuth" className={style.options}>
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
