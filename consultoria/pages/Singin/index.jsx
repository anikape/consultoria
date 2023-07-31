import React, { useState, useContext } from 'react'; // Adicionei o useContext
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../src/hooks/useAuth";
import { FaUser, FaInfoCircle } from 'react-icons/fa';
import style from "./singin.module.css";
import { AuthContext } from '../../src/contexts/auth';

const Singin = () => {
  
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext); // Obtenha a função signin do contexto
  const mockUsers = [
    {
      id: 1,
      name: "Usuário de Teste 1",
      email: "ana.br@hotmail.com",
      password: "123456",
    },
    {
      id: 2,
      name: "Usuário de Teste 2",
      email: "usuario2@teste.com",
      password: "123456",
    },
  ];

  const [useremail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificação dos campos obrigatórios
    if (!useremail || !password) {
      setLoginError('Usuário e/ou senha inválido');
      return;
    }

    // Lógica para verificar se o usuário e senha estão corretos
    // Idealmente, isso seria conectado a uma API ou banco de dados
    const user = mockUsers.find((user) => user.email === useremail && user.password === password);

    if (user) {
      // Chamando a função signin do contexto para autenticar o usuário
      const res = signin(useremail, password);

      if (res) {
        setError(res);
        return;
      }

      console.log('Login bem-sucedido');
      navigate("/home");
    } else {
      setLoginError('Usuário e/ou senha incorretos');
    }
  };

  return (
    <>
      <div className={style.containerForm}>

        <form onSubmit={handleSubmit}>
          <div className={style.div}>
            <div className={style.inputContainer}>
              {loginError && <p className={style.error}><FaInfoCircle /> {loginError}</p>}
              <input
                className={style.inputText}
                type="text"
                value={useremail}
                onChange={(e) => setUserEmail(e.target.value)}
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
        {/* <a className={style.forguet} href="">
          Esqueceu a senha?
        </a> */}
        <Link to="/redifine" className={style.forguet}>Esqueceu a senha?</Link>
      </div>
    </>
  );
};

export default Singin;