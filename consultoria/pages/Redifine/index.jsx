import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import style from './Redifine.module.css'
import Footer from '../../component/Footer/Footer'

const Redifine = () => {
  const [email, setEmail] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCaptchaVerification = () => {
    // Implement your reCAPTCHA verification logic here
    // Set the isCaptchaVerified state accordingly
    setIsCaptchaVerified(true);
  };

  const handleSubmit = () => {
    if (isCaptchaVerified) {
      // Implement your form submission logic here
      console.log('Form submitted:', email);
    } else {
      alert('Please verify the reCAPTCHA before submitting.');
    }
  };

  const handleCancel = () => {
    setEmail('');
    setIsCaptchaVerified(false);
  };

  return (
    <section className={style.container}>
      <div className={style.content}>
      <div className={style.logo1}></div>
    <label>Digite seu e-mail</label>
    <input className={style.input} type="email" value={email} onChange={handleEmailChange} placeholder='Digite seu e-mail' />
    <br />
    <ReCAPTCHA className={style.recaptcha}
      sitekey="YOUR_RECAPTCHA_SITE_KEY"
      onChange={handleCaptchaVerification}
    />
    <br />
    <button className={style.button1} onClick={handleSubmit}>Enviar</button>
    <button className={style.button2} onClick={handleCancel}>Cancelar</button>
    </div>

    <Footer />
  </section>
  );
};

export default Redifine;