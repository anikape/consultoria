import React, {useState, useContext, useEffect} from "react"; 
import iconUser from '../../src/assets/icon_user.svg'
import iconLock from '../../src/assets/icon_lock.svg'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../src/hooks/useAuth";
import { FaUser, FaInfoCircle } from "react-icons/fa";
import style from "./Signin.module.css";
// import { AuthContext } from "../../src/contexts/auth";
import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import Footer from "../../component/Footer";

const Signin = () => {
  const navigate = useNavigate();
  const { authenticated, signin } = useContext(AuthContext); // Obtenha a função signin do contexto

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!useremail || !password) {
        setLoginError("Usuário e/ou senha inválido");
        return;
      }
      if (useremail && password) {
        const isLogged = await signin(useremail, password);

        if (isLogged) {
          navigate("/home");
        }
        return;
      }
    } catch (error) {
      setLoginError("Usuário e/ou senha incorretos");
      console.log(error);
    }

    //Verificação dos campos obrigatórios

    // Lógica para verificar se o usuário e senha estão corretos
    // Idealmente, isso seria conectado a uma API ou banco de dados
    // const user = mockUsers.find(
    //   (user) => user.email === useremail && user.password === password
    // );

    // if (user) {
    // Chamando a função signin do contexto para autenticar o usuário
    //   const res = signin(useremail, password);

    //   if (res) {
    //     setError(res);
    //     return;
    //   }

    //   console.log("Login bem-sucedido");
    //   navigate("/home");
    // } else {
    //   setLoginError("Usuário e/ou senha incorretos");
    // }
  };

  return (
    <section>
      <div className={style.containerForm}>
        <div className={style.form}>
          <div className={style.logo1}></div>

          <form onSubmit={handleLogin}>
            <div className={style.inputContainer}>
              {loginError && (
                <p className={style.error}>
                  <FaInfoCircle /> {loginError}
                </p>
              )}
              <div className={style.inputGroup}>
                <div className={style.icon}>
                  <img src={iconUser} alt="" />
                </div>
                <input
                  className={style.inputText}
                  type="text"
                  value={useremail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Usuário"
                />
              </div>
              <div className={style.inputGroup}>
                {/* {loginError && <p>{loginError}</p>} */}
                <div className={style.icon}>
                  <img src={iconLock} alt="" />
                </div>
                <input
                  className={style.inputPass}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="......"
                />
              </div>
              <button className={style.send} type="submit">
                Entrar
              </button>
            </div>
          </form>

          <Link to="/redifine" className={style.forguet}>
            Esqueceu a senha?
          </Link>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Signin;
