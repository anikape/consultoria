import React from "react";
import style from './loading.module.css'


export const Loading = () => {
  return (
    <section className={style.section}>

    
    <div className={style.container}>
      
      <span className={style.span}></span>
      <span className={style.span}></span>
      <span className={style.span}></span>
      <span className={style.span}></span>
      </div>
    </section>
  );
};
