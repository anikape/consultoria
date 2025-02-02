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

const AdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { postData } = useFetch();

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
        `admin/restrict/${auth.user.id}`,
        { password },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        setMessage(response.response.data);

        throw new Error(response.data);
      }

      await auth.isAuthorized(true);

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
          <form className={style.form} onSubmit={handleSubmit(handleLogin)}>
            <div className={style.errorWrapper}>
              {auth.error && (
                <>
                  <span className={style.error}>
                    <FaInfoCircle />
                    {auth.error}
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
              <button className={style.button} type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Ok"}
              </button>
              <Link className={style.button} disabled={loading} to={"/Home"}>
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AdminAuth;
