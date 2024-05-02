import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useFetch } from "../../src/hooks/useFetch";

import check from "../../src/assets/check.png";
import info from "../../src/assets/info.png";
import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";

import style from "./password.module.css";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { editPassword } = useFetch();

  const onSubmit = async (data) => {
    const password = data.rawPassword;
    setLoading(true);

    try {
      if (!state.id) {
        return;
      }
      const response = await editPassword(`admin/${state.id}`, {
        password,
      });

      if (response.status !== 200) {
        throw new Error(`${response.response.data.errors[0]}`);
      }
      setError(false);
      setLoading(false);
      setMessage("Senha atualizada com sucesso");
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setError(true);
    setMessage("");
    setLoading(false);
    navigate("/");
  };

  return (
    <section className={style.redefine}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.logo1}></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!error && loading ? (
              <>
                <LoadingSpinner />
              </>
            ) : (
              <>
                <div className={style.inputContainer}>
                  {!loading && error && (
                    <>
                      <div className={style.info}>
                        <img src={info} alt="Erro ao atualizar senha" />
                        <p>{message}</p>
                      </div>
                    </>
                  )}

                  {!error && !loading && isSubmitSuccessful ? (
                    <>
                      <div className={style.success}>
                        <p>{!loading && message}</p>
                        <img src={check} alt="" />
                        <Link
                          className={style.back}
                          to="/"
                          onClick={handleCancel}>
                          Voltar
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <>
                          <LoadingSpinner />
                        </>
                      ) : (
                        <>
                          <div className={style.inputGroup}>
                            <input
                              {...register("rawPassword", {
                                required: "Campo obrigatóprio",
                                pattern: {
                                  value:
                                    /^(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).*[A-Z].*$/,
                                  message:
                                    "Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial",
                                },
                              })}
                              className={style.input}
                              type="password"
                              placeholder="Digite a senha:"
                            />
                            <p className={style.errorMessage}>
                              {errors.rawPassword?.message}
                            </p>
                          </div>
                          <div className={style.inputGroup}>
                            <input
                              {...register("confirmPassword", {
                                required: "Campo obrigatório",
                                validate: (value) =>
                                  value === watch("rawPassword") ||
                                  "Os campos não correspondem, devem ser iguais",
                              })}
                              className={style.input}
                              type="password"
                              placeholder="Repita a senha:"
                            />
                            <p className={style.errorMessage}>
                              {errors.confirmPassword?.message}
                            </p>
                          </div>
                          <button className={style.submit} type="submit">
                            Enviar
                          </button>
                          <button
                            className={style.cancel}
                            onClick={handleCancel}>
                            Cancelar
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Password;
