import React from "react";
import style from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <section className={style.footerContainer}>
      <div className={style.logoFooter}></div>
      
      <div className={style.lineFooter}></div>

      <p className={style.paragraph}>© {currentYear} PC CONSULTORIA PROJETOS & SERVIÇOS AMBIENTAIS. TODOS OS DIREITOS RESERVADOS.</p>
    </section>
  );
};

export default Footer;
