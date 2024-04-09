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
  const { signin, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async ({ useremail, password }) => {
    setLoading(true);
    try {
      if (useremail && password) {
        const response = await signin(useremail, password);

        if (!response.status === 200 || !response) {
          navigate("/");
          throw new Error(response.data);
        }
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={style.signin}>
      <div className={style.containerForm}>
        <div className={style.form}>
          <div className={style.logo1}></div>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className={style.inputContainer}>
              <div className={style.errorWrapper}>
                {error && (
                  <>
                    <span className={style.error}>
                      <FaInfoCircle />
                      {error}
                    </span>
                  </>
                )}
              </div>
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
              <div className={style.actions}>
                {loading ? (
                  <>
                    <LoadindSpiner />
                  </>
                ) : (
                  <>
                    <button
                      className={style.send}
                      type="submit"
                      disabled={loading}>
                      Entrar
                    </button>
                    <Link to="/redifine" className={style.forguet}>
                      Esqueceu a senha?
                    </Link>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Signin;
