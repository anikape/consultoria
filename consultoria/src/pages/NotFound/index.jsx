import Footer from "@components/Footer";
import style from "@pages/NotFound/NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className={style.home}>
      <section className={style.sectionHome}>
        <div className={style.containerHome}>
          <div className={style.content}>
            <div className={style.info}>
              <h2>Página não econtrada</h2>
              <Link to="/home" className={style.link}>
                Clique aqui para voltar
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export { NotFound };
