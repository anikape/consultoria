import React, { useEffect, useState } from 'react';
import style from './LoadingAnimation.module.css';

const Index = () => {
  const [text, setText] = useState('');
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    const originalText = 'PC Consultoria';
    let intervalId;

    const typeText = () => {
      if (visibleCharacters <= originalText.length) {
        setText(originalText.substring(0, visibleCharacters));
        setVisibleCharacters((prevVisibleCharacters) => prevVisibleCharacters + 1);
      } else {
        setVisibleCharacters(0); // Reinicia o efeito
      }
    };

    intervalId = setInterval(typeText, 150);

    return () => clearInterval(intervalId);
  }, [visibleCharacters]);

  return (
    <div className={style.loadingText}>
      {text.split('').map((char, index) => (
        <span key={index} className={style.letter}>{char}</span>
      ))}
    </div>
  );
};

export default Index;
