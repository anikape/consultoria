import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useFetch } from "../../src/hooks/useFetch";

import check from "../../src/assets/check.png";
import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";

import style from "./Redefine.module.css";

const Redefine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const { postData } = useFetch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postData("admin/mailer", data);

      if (response.status !== 200) {
        throw new Error("Não foi possível localizar a conta");
      }
      setError(false);
      setLoading(false);
      setMessage("Verifique seu email");
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
                  <p>{!loading && error && message}</p>
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
                          <input
                            {...register("emailTo")}
                            className={style.input}
                            type="email"
                            placeholder="Digite seu e-mail"
                          />
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

export default Redefine;
