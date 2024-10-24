import React from "react";
import style from "@/components/Footer/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={style.footerContainer}>
      <div className={style.logoFooter}></div>

      <div className={style.lineFooter}></div>

      <p className={style.paragraph}>
        © {currentYear} PC CONSULTORIA PROJETOS & SERVIÇOS AMBIENTAIS. TODOS OS
        DIREITOS RESERVADOS.
      </p>
    </footer>
  );
};

export default Footer;
