import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropTypes from 'prop-types';
import Home from "../../pages/Home";
import Singin from "../../pages/Singin";
import Redifine from "../../pages/Redifine";
import Client from "../../pages/Client";
import Profile from "../../pages/Profile";

const clients = [
  {
    id: 1,
    name: "Ana Santos",
    email: "teste@test.com",
    mobile: 81988693599,
    endereco: {
      rua: "rua das flores",
      numero: 1,
      bairro: "Sonho",
      cidade: "Recife",
      complemento: "",
    },
    documents: [
      { name: "LAS -licença ambiental simplificada" },
      { name: "LP - Licença prévia" },
      { name: "LI - Licença de instalação" },
      { name: "LO - Licença de operação" },
      { name: "LOC - Licença de operação corretiva" },
      { name: "CR - Certificado de registro Exercito" },
      { name: "CRC- Certificado de Registro Cadastral (Polícia Federal)" },
      { name: "CLF- Certificado de Licença de Funcionamento" },
      { name: "AE- Autorização Especial" },
    ],
  },
  {
    id: 2,
    name: "Jesica Santana",
    email: "teste@test.com",
    mobile: 81988693599,
    endereco: {
      rua: "rua das flores",
      numero: 1,
      bairro: "Sonho",
      cidade: "Recife",
      complemento: "",
    },
    documents: [
      { name: "LAS -licença ambiental simplificada" },
      { name: "LP - Licença prévia" },
      { name: "LI - Licença de instalação" },
      { name: "LO - Licença de operação" },
      { name: "LOC - Licença de operação corretiva" },
      { name: "CR - Certificado de registro Exercito" },
      { name: "CRC- Certificado de Registro Cadastral (Polícia Federal)" },
      { name: "CLF- Certificado de Licença de Funcionamento" },
      { name: "AE- Autorização Especial" },
    ],
  },
  {
    id: 3,
    name: "Well Nobre",
    email: "teste@test.com",
    mobile: 81988693599,
    endereco: {
      rua: "rua das flores",
      numero: 1,
      bairro: "Sonho",
      cidade: "Recife",
      complemento: "",
    },
    documents: [
      { name: "LAS -licença ambiental simplificada" },
      { name: "LP - Licença prévia" },
      { name: "LI - Licença de instalação" },
      { name: "LO - Licença de operação" },
      { name: "LOC - Licença de operação corretiva" },
      { name: "CR - Certificado de registro Exercito" },
      { name: "CRC- Certificado de Registro Cadastral (Polícia Federal)" },
      { name: "CLF- Certificado de Licença de Funcionamento" },
      { name: "AE- Autorização Especial" },
    ],
  },
  {
    id: 4,
    name: "Yashina Gomes",
    email: "teste@test.com",
    mobile: 81988693599,
    endereco: {
      rua: "rua das flores",
      numero: 1,
      bairro: "Sonho",
      cidade: "Recife",
      complemento: "",
    },
    documents: [
      { name: "LAS -licença ambiental simplificada" },
      { name: "LP - Licença prévia" },
      { name: "LI - Licença de instalação" },
      { name: "LO - Licença de operação" },
      { name: "LOC - Licença de operação corretiva" },
      { name: "CR - Certificado de registro Exercito" },
      { name: "CRC- Certificado de Registro Cadastral (Polícia Federal)" },
      { name: "CLF- Certificado de Licença de Funcionamento" },
      { name: "AE- Autorização Especial" },
    ],
  },
];


const Private = ({ Item, signed }) => {
  return signed ? <Item /> : <Singin />;
}

Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
  signed: PropTypes.bool.isRequired,
};

const RoutesApp = () => {
  // Aqui você deve definir o estado de autenticação adequadamente.
  // Por exemplo, pode ser obtido de um contexto, do armazenamento local, etc.
  const signed = true; // Defina o estado de autenticação corretamente

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {/* Rota para a página inicial, acessível somente se autenticado */}
          <Route exact path="/home" element={<Private Item={Home} signed={signed} />} />
          {/* Rota para a página de login */}
          <Route path="/" element={<Singin />} />
          {/* Rota de curinga para lidar com qualquer outra rota não definida */}
          <Route path="*" element={<Singin />} />
          {/* Rota para a página de redefinição de senha */}
          <Route path="/redifine" element={<Redifine />} />
          {/* Rota para a página do cliente, acessível somente se autenticado */}
          <Route path="/Client" element={<Private Item={Client} signed={signed} />} />
          <Route path="/profile/:id" element={<Private Item={() => <Profile clients={clients} />} signed={signed} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
};

export default RoutesApp;
