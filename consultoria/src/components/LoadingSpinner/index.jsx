import { useState, useEffect } from "react";
import "@/components/LoadingSpinner/LoadingSpinner.css"; // Estilos CSS para o componente de loading

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // Tempo de espera em milissegundos (2 segundos neste caso)

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="loading-container">
      <div className={`loading-spinner ${loading ? "show" : ""}`}>
        <div className="circle"></div>
        <div className="pc-text">PC</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
