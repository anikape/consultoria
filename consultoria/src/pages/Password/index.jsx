import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useFetch } from "@/hooks/useFetch";

import check from "@/assets/check.png";
import info from "@/assets/info.png";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

import style from "@/pages/Password/password.module.css";
import { AxiosError } from "axios";

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

  useEffect(() => {
    if (!state) {
      navigate("/redefine");
    }
  }, [state]);

  const onSubmit = async (data) => {
    const password = data.rawPassword;
    setLoading(true);

    try {
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
      if (error instanceof AxiosError) {
        setMessage(error.message);
      }
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
                          onClick={handleCancel}
                        >
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
                            onClick={handleCancel}
                          >
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
