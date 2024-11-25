import { Link, Outlet } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { AdminProvider } from "@contexts/Admin/AdminContext";

import home from "@/assets/home.png";
import userAdd from "@/assets/useradd.png";
import userEdit from "@/assets/useredit.png";
import del from "@/assets/delete.png";

import style from "@pages/Adm/adm.module.css";

const Index = () => {
  return (
    <AdminProvider>
      <section className={style.admSection}>
        <div className={style.admContainer}>
          <div className={style.admContent}>
            <div className={style.admNav}>
              <nav className={style.nav}>
                <ul>
                  <li>
                    <Link className={style.links} to="/Home">
                      <img src={home} alt="Home" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"settings"} className={style.links}>
                      <img src={userEdit} alt="Editar" />
                      Editar
                    </Link>
                  </li>
                  <li>
                    <Link className={style.links} to={"change-password"}>
                      <div className={style.linkIcon}>
                        <RiLockPasswordFill />
                      </div>
                      Alterar senha
                    </Link>
                  </li>
                  <li>
                    <button
                      className={style.links}
                      onClick={() => alert("Função de exclusão implementada!")}>
                      <img src={del} alt="Excluir" />
                      Excluir
                    </button>
                  </li>
                  <li>
                    <Link className={style.links} to="/CadastroAdm">
                      <img src={userAdd} alt="Novo Usuário" />
                      Novo Usuário
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </AdminProvider>
  );
};

export default Index;
