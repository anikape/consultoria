import { useState } from 'react';
// import ReCAPTCHA from "react-google-recaptcha";
import style from './Redifine.module.css'


import Footer from '../../component/Footer/Footer'

const Redifine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const handleCaptchaVerification = () => {
  //   // Implement your reCAPTCHA verification logic here
  //   // Set the isCaptchaVerified state accordingly
  //   setIsCaptchaVerified(true);
  // };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulação de uma requisição ao backend com um atraso de 2 segundos (simulando o envio de um email)
      setTimeout(() => {
        setIsLoading(false);
        // Redirecionar para outra rota após o atraso (simulando o sucesso do envio do email)
        window.location.href = '/verification';
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao enviar o email:', error);
    }
  };

  const handleCancel = () => {
    setEmail('');
  };

  // const handleSubmit = () => {
  //   if (isCaptchaVerified) {
  //     // Implement your form submission logic here
  //     console.log('Form submitted:', email);
  //      // Redirecione para a nova página após o envio do formulário
  //      history.push('/verification');
  //   } else {
  //     alert('Please verify the reCAPTCHA before submitting.');
  //   }
  // };

 

  return (
    <section className={style.container}>
      <div className={style.content}>
      <div className={style.logo1}></div>
    <label>Digite seu e-mail</label>
    <input className={style.input} type="email" value={email} onChange={handleEmailChange} placeholder='Digite seu e-mail' />
    <br />
    {/* <ReCAPTCHA className={style.recaptcha}
      sitekey="YOUR_RECAPTCHA_SITE_KEY"
      onChange={handleCaptchaVerification}
    /> */}
    <br />
    <button className={style.button1} onClick={handleSubmit}>Enviar</button>
    <button className={style.button2} onClick={handleCancel}>Cancelar</button>
    </div>
    
    <Footer />
  </section>
  );
};

export default Redifine;