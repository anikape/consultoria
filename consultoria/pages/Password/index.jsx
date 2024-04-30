import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../src/hooks/useFetch";
import check from "../../src/assets/check.png";

// import ReCAPTCHA from "react-google-recaptcha";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import style from "./password.module.css";

import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [token] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const { postData } = useFetch();

  const tokenAuthorization = token.get("token");
  const { editPassword } = useFetch();

  console.table(id, token.get("token"));
  console.log("Location:", state);

  const onSubmit = async (data) => {
    const password = data.rawPassword;
    setLoading(true);

    try {
      if (id) {
        return;
      }
      const response = await editPassword(`admin/${id}`, {
        // ...state,
        password,
      });

      if (response.status !== 200) {
        console.log(response);
        throw new Error("Não foi possível localizar a conta");
      }
      setError(false);
      setLoading(false);
      setMessage("Verifique seu email");
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }

    console.log(id);
    console.log({ password, ...state });
  };

  const handleCancel = () => {
    setError(true);
    setMessage("");
    setLoading(false);
    navigate("/");
  };

  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [errors, setErrors] = useState({});

  // const validatePassword = (value) => {
  //   const passwordRegex = /^(?=(?:\D*\d){4})(?=(?:[^\d]*\d){2})[a-zA-Z0-9]{6}$/;
  //   return passwordRegex.test(value);
  // };

  // const handlePasswordChange = (e) => {
  //   const value = e.target.value;
  //   setPassword(value);
  //   const passwordValid = validatePassword(value);
  //   setErrors((prevErrors) => ({ ...prevErrors, password: !passwordValid }));
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   const value = e.target.value;
  //   setConfirmPassword(value);
  //   const passwordMatch = value === password;
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     confirmPassword: !passwordMatch,
  //   }));
  // };

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
                            {...register("rawPassword")}
                            className={style.input}
                            type="password"
                            placeholder="Digite a senha:
"
                          />
                          <input
                            {...register("confirmPassword")}
                            className={style.input}
                            type="password"
                            placeholder="Repita a senha:
"
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

export default Password;
