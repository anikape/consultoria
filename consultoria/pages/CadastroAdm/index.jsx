import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
import logo from "../../src/assets/logo1.png";
import info from "../../src/assets/info.png";
import adm from "../../src/assets/iconuser.svg";
import { FaHome } from "react-icons/fa";
import style from "./cadastro.module.css";

const FormularioCadastro = () => {
  const handleAddAdmin = async () => {
    try {
      const backendURL = 'http://localhost:3003'; // Substitua com a URL do seu back-end
      const response = await fetch(`${backendURL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          password: formData.password,
        }),
      });

      if (response.ok) {
        console.log('Novo administrador adicionado com sucesso!');
        setShowSuccessPopup(true);
      } else {
        console.error('Erro ao adicionar novo administrador');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handlePasswordInfoClick = () => {
    setShowPasswordInfo(!showPasswordInfo);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando os campos do formulário
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(formData.password);

    if (
      formData.name &&
      formData.email &&
      formData.cpf &&
      isPasswordValid &&
      formData.password === formData.confirmPassword
    ) {
      setShowSuccessPopup(true);

      // Limpa o formulário
      setFormData({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      console.error('Por favor, preencha corretamente todos os campos do formulário.');
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className={style.cadastroContainer}>
      <div className={style.buttonsLink}>
        <Link className={style.buttonHome} to="/Home">
          <button>
            <FaHome className={style.home} />
          </button>
        </Link>

        <Link className={style.buttonHome} to="/adm">
          <button>
            <img src={adm} className={style.admIcon} alt="Admin Icon" />
          </button>
        </Link>
      </div>

      <div className={style.formContainer}>
        <figure className={style.logo}>
          <img src={logo} alt="Logo" />
        </figure>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="name">
              Nome completo:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome completo"
              required
              className={style.input}
              id="name"
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="email">
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              required
              className={style.input}
              id="email"
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="cpf">
              CPF:
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="CPF"
              required
              className={style.input}
              id="cpf"
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="password">
              Senha:
            </label>
            <div className={style.passwordInput}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Senha"
                required
                minLength={8}
                className={style.input}
                id="password"
              />
              <span
                className={style.infoIcon}
                onClick={handlePasswordInfoClick}>
                <img src={info} alt="Info Icon" />
              </span>
            </div>
            {showPasswordInfo && (
              <span className={style.infoMessage}>
                A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial.
              </span>
            )}
          </div>

          <div className={style.inputGroup}>
            <label className={style.label} htmlFor="confirmPassword">
              Confirmar Senha:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirmar Senha"
              required
              minLength={8}
              className={style.input}
              id="confirmPassword"
            />
          </div>

          <button
            className={style.button2}
            type="button"
            onClick={handleAddAdmin}>
            Cadastrar
          </button>

          <button
            className={style.button2}
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                email: "",
                cpf: "",
                password: "",
                confirmPassword: "",
              })
            }>
            Cancelar
          </button>
        </form>

        {/* Modal de sucesso */}
        {showSuccessPopup && (
          <div className={style.successModal}>
            <div className={style.modalContent}>
              <p>Cadastrado com sucesso!</p>
              <button onClick={handleCloseSuccessPopup}>Fechar</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FormularioCadastro;
