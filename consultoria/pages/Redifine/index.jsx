import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

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
    <div>
    <h1>Contact Form</h1>
    <label>Email:</label>
    <input type="email" value={email} onChange={handleEmailChange} />
    <br />
    <ReCAPTCHA
      sitekey="YOUR_RECAPTCHA_SITE_KEY"
      onChange={handleCaptchaVerification}
    />
    <br />
    <button onClick={handleSubmit}>Enviar</button>
    <button onClick={handleCancel}>Cancelar</button>
  </div>
  );
};

export default Redifine;