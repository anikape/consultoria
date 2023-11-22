import React, { useState, useEffect } from 'react'
import api from '../../service/api';
import { Link,useNavigate } from 'react-router-dom';
import style from "./home.module.css"
import { FaUserAlt, FaTasks, FaNewspaper, FaUsers  } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useAuth from '../../src/hooks/useAuth';
import DocumentsPage from '../DocumentsPage/DocumentsPage';

const home = () => {

  const [data,setData] = useState(null)

  const { signout } = useAuth();
  const navigate = useNavigate();

  const navigateToDocumentsPage = () => {
    // Use a função navigate para navegar para DocumentsPage e passe a lista de clientes como estado
    navigate('/DocumentsPage', { state: { clients } });
  };

    useEffect(()=>{getData()},[])

    const getData= async () => {
      try {
          

        const response = await api.postUsers({
          
          login: "florencia2@gmail.com",
          password: "98765"
        });
      const teste = JSON.stringify(response.data)
      setData(response.data)
      console.log(response)
  
  
      } catch(err) {
          // TODO
          // adicionar tratamento da exceção
          console.error(err);
          
      }
  };


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

           
             <Link to="/DocumentsPage" className={style.options}>
              <FaNewspaper />Documentos
             </Link>
             
             <Link to=""  className={style.options}>
             <FaUsers />Área Adm
             </Link>
                      </div>  

          <button onClick={() => [signout(), navigate("/")]} className={style.logout}> <BiLogOut />  sair</button>
                  
                </section>

    
          {data}
    </section>
  )
}

export default home