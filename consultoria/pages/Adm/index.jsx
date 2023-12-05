import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Página Index</h1>
      <Link to="/CadastroAdm">
        <button>Ir para outra página</button>
      </Link>
    </div>
  );
};

export default Index;
