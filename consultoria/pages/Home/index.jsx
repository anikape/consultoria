import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import style from "./home.module.css"
import { FaUserAlt, FaTasks, FaNewspaper, FaUsers  } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useAuth from '../../src/hooks/useAuth';

const home = () => {

  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <section className={style.containerHome}>

        <section className={style.content}>
          <div className={style.info}>
          <FaUserAlt 
          
          className={style.icon}/>

          <p>Olá, Cristiane</p>
          </div>

          <div className={style.links}>

            <Link to="/client" className={style.options}>
            <FaTasks /> Lista de clientes
            </Link>
             <Link to="" className={style.options}>
              <FaNewspaper />Documentos
             </Link>
             
             <Link to=""  className={style.options}>
             <FaUsers />Área Adm
             </Link>
            

          </div>  

          <button onClick={() => [signout(), navigate("/")]} className={style.logout}> <BiLogOut />  sair</button>
          
          
        

        </section>

    
    </section>
  )
}

export default home