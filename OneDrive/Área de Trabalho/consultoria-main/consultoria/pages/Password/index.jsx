import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./password.module.css";
import logo from "../../src/assets/logo1.png";
import info from "../../src/assets/info.png";
import Footer from "../../component/Footer";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = (value) => {
    const passwordRegex = /^(?=(?:\D*\d){4})(?=(?:[^\d]*\d){2})[a-zA-Z0-9]{6}$/;
    return passwordRegex.test(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordValid = validatePassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: !passwordValid }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const passwordMatch = value === password;
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: !passwordMatch,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    if (!errors.password && !errors.confirmPassword) {
      // Form is valid, proceed with submission
      console.log(
        "Form is valid. Password:",
        password,
        "Confirm Password:",
        confirmPassword
      );
    } else {
      // Form has errors, handle them accordingly
      console.log("Form has errors.");
    }
  };
  return (
    <section className={style.passContainer}>
      <div className={style.passContent}>
        <img className={style.logo} src={logo} alt="Logo" />

        <div className={style.info}>
          <img src={info} alt="Simbolo de Informação" />
          <p>
            A senha deverá conter exatamente 6 caracteres, dos quais 4 deverão
            ser numéricos e 2 alfanuméricos.
          </p>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formContent}>
            <label className={style.label} htmlFor="password">
              Digite a senha:
            </label>
            <div className={style.inputGroup}>
              <div className={style.icon}>
                <div className={style.icon}>
                  <img src="../../src/assets/icon_lock.svg" alt="" />
                </div>
              </div>
              <input
                className={style.input}
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="*****"
              />
            </div>

            <span
              className={`${style.error} ${
                errors.password ? style.visible : ""
              }`}>
              A senha deve conter 6 caracteres, sendo 4 numéricos e 2
              alfanuméricos.
            </span>
          </div>
          <div className={style.formContent}>
            <label className={style.label} htmlFor="confirmPassword">
              Repita a senha:
            </label>

            <div className={style.inputGroup}>
              <div className={style.icon}>
                <img src="../../src/assets/icon_lock.svg" alt="" />
              </div>
              <input
                className={style.input}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="*****"
              />
            </div>
            <span
              className={`${style.error} ${
                errors.confirmPassword ? style.visible : ""
              }`}>
              As senhas não coincidem.
            </span>
          </div>

          <div className={style.buttonGroup}>
            <button className={style.button1} type="submit">
              Redefinir
            </button>
            <button className={style.button2} type="submit">
              Cancelar
            </button>
            <Link to="/" className={style.back}>
              Voltar
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </section>
  );
};

export default Password;
