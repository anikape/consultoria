import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { AdminProvider } from "@contexts/Admin/AdminContext";
import { HiUser, HiUserPlus } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";

import home from "@/assets/home.png";
import style from "@pages/Adm/adm.module.css";
// import axios from "axios";

const Index = () => {
  // const [authorized, setAuthorized] = useState(true);
  // const navigate = useNavigate();

  // const checkAuthorization = async () => {
  //   try {
  //     const response = await axios.get("", { withCredentials: true });
  //     if (response.status !== 200) {
  //       throw new Error("Erro ao autorizar acesso");
  //     }

  //     setAuthorized(true);
  //   } catch (error) {
  //     setAuthorized(false);
  //     navigate("/AdminAuth");
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthorization();
  // }, [navigate]);

  // if (!authorized) {
  //   return <p>Carregando...</p>;
  // }

  return (
    <AdminProvider>
      <section className={style.admSection}>
        <div className={style.admContainer}>
          <div className={style.admNav}>
            <nav className={style.nav}>
              <ul className={style.navLinks}>
                <li>
                  <Link className={style.links} to="/Home">
                    <img src={home} alt="Home" />
                    <p className={style.linkText}>Home</p>
                  </Link>
                </li>
                <li>
                  <Link className={style.links} to={"/Adm"}>
                    <div className={style.linkIcon}>
                      <HiUser />
                    </div>
                    <p className={style.linkText}>Perfil</p>
                  </Link>
                </li>
                <li>
                  <Link to={"settings"} className={style.links}>
                    <div className={style.linkIcon}>
                      <FaUserEdit />
                    </div>

                    <p className={style.linkText}>Editar</p>
                  </Link>
                </li>
                <li>
                  <Link className={style.links} to={"change-password"}>
                    <div className={style.linkIcon}>
                      <RiLockPasswordFill />
                    </div>
                    <p className={style.linkText}>Alterar senha</p>
                  </Link>
                </li>

                <li>
                  <Link className={style.links} to="/CadastroAdm">
                    <div className={style.linkIcon}>
                      <HiUserPlus />
                    </div>

                    <p className={style.linkText}>Novo usuário</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={style.admContent}>
            <Outlet />
          </div>
        </div>
      </section>
    </AdminProvider>
  );
};

export default Index;
