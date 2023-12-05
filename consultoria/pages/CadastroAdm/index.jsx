import React, { useState } from 'react';
import Footer from "../../component/Footer/Footer"
import logo from '../../src/assets/logo1.png'
import style from './cadastro.module.css'

const FormularioCadastro = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
    if (
      formData.fullName &&
      formData.email &&
      formData.cpf &&
      formData.password &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    ) {
      // Simulação do envio para o banco de dados (pode ser uma chamada à API, etc.)
      // Aqui você faria a lógica para enviar os dados ao backend

      // Após o envio bem-sucedido, exibe o popup de sucesso
      setShowSuccessPopup(true);

      // Limpa o formulário
      setFormData({
        fullName: '',
        email: '',
        cpf: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className={style.cadastroContainer}>


      <div className={style.formContainer} >

        <figure className={style.logo}>
          <img src={logo} />
        </figure>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="fullName">Nome completo:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nome completo"
              required
              className={style.input}
              id="fullName"
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="email">E-mail:</label>
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
            <label className={style.label}  htmlFor="cpf">CPF:</label>
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
            <label className={style.label} htmlFor="password">Senha:</label>
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
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="confirmPassword">Repita a senha:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repita a senha"
              required
              minLength={8}
              className={style.input}
              id="confirmPassword"
            />
          </div>
          <button className={style.button1} type="submit">Cadastrar</button>
          <button className={style.button2}  type="button" onClick={() => setFormData({
            fullName: '',
            email: '',
            cpf: '',
            password: '',
            confirmPassword: '',
          })}>
            Cancelar
          </button>
        </form>

        {showSuccessPopup && (
          <div className="popup">
            <div className="popup-content">
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
