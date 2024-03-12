import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { AuthContext } from "../../src/contexts/Auth/AuthContext";

import iconUser from "../../src/assets/icon_user.svg";
import iconLock from "../../src/assets/icon_lock.svg";
import { FaInfoCircle } from "react-icons/fa";

import LoadindSpiner from "../../component/LoadingSpinner";
import ErrorComponent from "../../component/ErrorComponente/ErrorComponent";
import Footer from "../../component/Footer";

import style from "./Signin.module.css";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { authenticated, signin } = useContext(AuthContext); // Obtenha a função signin do contexto

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async ({ useremail, password }) => {
    setLoading(true);

    try {
      if (useremail && password) {
        const response = await signin(useremail, password);

        if (response.status !== 200) {
          setLoginError(response.data);
          setLoading(false);
          return;
        }
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      setLoginError("Usuário e/ou senha incorretos");
      console.log(error);
    }
  };

  return (
    <section className={style.signin}>
      <div className={style.containerForm}>
        <div className={style.form}>
          <div className={style.logo1}></div>

          <form onSubmit={handleSubmit(handleLogin)}>
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
                  className={style.input}
                  type="text"
                  {...register("useremail", { required: "Campo obrigatório" })}
                  placeholder="Usuário"
                />
                <ErrorComponent message={errors.useremail?.message} />
              </div>
              <div className={style.inputGroup}>
                <div className={style.icon}>
                  <img src={iconLock} alt="" />
                </div>
                <input
                  className={style.input}
                  type="password"
                  {...register("password", { required: "Campo obrigatório" })}
                  placeholder="******"
                />
                <ErrorComponent message={errors.password?.message} />
              </div>
              {loading ? (
                <LoadindSpiner />
              ) : (
                <>
                  <button className={style.send} type="submit">
                    Entrar
                  </button>

                  <Link to="/redifine" className={style.forguet}>
                    Esqueceu a senha?
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Signin;
