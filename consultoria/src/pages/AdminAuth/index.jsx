import style from "@pages/AdminAuth/AdminAuth.module.css";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { AuthContext } from "@contexts/Auth/AuthContext";

import iconLock from "@assets/LockError.svg";
import { FaInfoCircle } from "react-icons/fa";

import LoadindSpiner from "@components/LoadingSpinner";
import Footer from "@components/Footer";
import { useFetch } from "@/hooks/useFetch";
import Cookies from "universal-cookie";

const AdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { signin, user, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postData } = useFetch();

  const cookie = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async ({ password }) => {
    setLoading(true);
    try {
      if (!password) {
        return;
      }

      const response = await postData(
        `/admin/restrict/${user.id}`,
        { password },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status !== 200) {
        setMessage(response.response.data);
        console.log(response);
        throw new Error(response.data);
      }

      console.log(response);
      const teste = cookie.get("sessionToken");
      console.log(teste);

      navigate("/Adm");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={style.main}>
      <section className={style.AdminAuthSection}>
        <div className={style.container}>
          <div className={style.form}>
            <form onSubmit={handleSubmit(handleLogin)}>
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

              <div className={style.inputContainer}>
                <div className={style.inputContainerH2}>
                  <h2>Ação protegida por senha</h2>
                  <p className={style.inputContainerP}>
                    Para realizar esta ação é necessário informar a sua senha.
                  </p>
                </div>
                <p className={style.errorMessage}>{message}</p>
                <div className={style.inputGroup}>
                  <img src={iconLock} alt="" />
                  <div className={style.inputWrapper}>
                    <label htmlFor="">Informe sua senha:</label>
                    <input
                      className={style.input}
                      type="password"
                      {...register("password", {
                        required: "Campo obrigatório",
                      })}
                      placeholder="******"
                    />
                    <p className={style.inputErrorMessage}>
                      {errors.password?.message}
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.formActions}>
                <button
                  className={style.button}
                  type="submit"
                  disabled={loading}>
                  {loading ? "Carregando..." : "Ok"}
                </button>
                <Link className={style.button} disabled={loading} to={"/Home"}>
                  {loading ? "Carregando..." : "Cancelar"}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AdminAuth;
