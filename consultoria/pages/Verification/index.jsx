import React from 'react'
import style from './verification.module.css'
import Footer from '../../component/Footer/Footer'

const index = () => {
  return (
    <section className={style.container}>

<div className={style.content}>
      <div className={style.logo1}></div>
      <div className={style.verification}>
      <p>Verifique seu e-mail</p>
        <img className={style.check} src='../../src/assets/check.png' alt='Imagem de check' />

      <a href='/'  >Voltar</a>
      </div>
    </div>
   

 <Footer />
</section>
      
    
  )
}

export default index