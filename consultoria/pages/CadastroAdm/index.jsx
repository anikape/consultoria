import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../../component/Footer/Footer"
import logo from '../../src/assets/logo1.png'
import info from '../../src/assets/info.png'
import adm from '../../src/assets/iconuser.svg'
import { FaHome } from "react-icons/fa";
import style from './cadastro.module.css'

const FormularioCadastro = () => {

  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Estado para controlar o modal de sucesso

  const handlePasswordInfoClick = () => {
    setShowPasswordInfo(!showPasswordInfo);
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
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
    const passwordRegex = /^(?=.*[0-9]{4})(?=.*[a-zA-Z]{2}).{6}$/;
    const isPasswordValid = passwordRegex.test(formData.password);
  
    if (
      formData.fullName &&
      formData.email &&
      formData.cpf &&
      isPasswordValid &&
      formData.password === formData.confirmPassword
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

        <div className={style.buttonsLink}>

        <Link className={style.buttonHome} to="/Adm">
        <button ><FaHome  className={style.home}/></button>
        </Link>

        <Link className={style.buttonHome} to="/adm">
        <button ><img src={adm} className={style.admIcon}/></button>
        </Link>

        </div>
                

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
              minLength={6}
              className={style.input}
              id="password"
            />
            <span
              className={style.infoIcon}
              onClick={handlePasswordInfoClick}
            >
              <img src={info} alt='Ícone de Informação' />
            </span>
          </div>
            {showPasswordInfo && (
            <span className={style.infoMessage}>
              A senha deverá conter exatamente 6 caracteres, dos quais 4 deverão ser numéricos e 2 alfanuméricos.
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
            minLength={6}
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

