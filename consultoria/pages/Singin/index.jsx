import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import useAuth from "../../src/hooks/useAuth"
import { FaUser, FaInfoCircle } from 'react-icons/fa';
import style from "./singin.module.css"

const Singin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificação dos campos obrigatórios
    if (username === '' || password === '') {
      setLoginError('Usuário e/ou senha inválido');
      return;
    }

    // Lógica para verificar se o usuário e senha estão corretos
    // Idealmente, isso seria conectado a uma API ou banco de dados

    if (username === 'usuario' && password === 'senha') {
      alert('Login bem-sucedido');
    } else {
      setLoginError('Usuário e/ou senha inválido');
    }
  };
 
 return(
  <>
  <div className={style.containerForm}>
     

      <form onSubmit={handleSubmit}>
        <div className={style.div}>
          <div className={style.inputContainer}>
            {loginError && <p className={style.error}><FaInfoCircle /> {loginError}</p>}
            <input
              className={style.inputText}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
            />
          </div>
        </div>
        <div className={style.div}>
          <input
          className={style.inputPass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="......"
          />
          {/* {loginError && <p>{loginError}</p>} */}
        </div>
        <button type="submit">Enviar</button>
      </form>
      <a className={style.forguet} href="">
        Esqueceu a senha?
      </a>
    </div>
    </>
 )

}


export default Singin
