import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropTypes from 'prop-types';
import Home from "../../pages/Home";
import Singin from "../../pages/Singin";
import Redifine from "../../pages/Redifine";
import Client from "../../pages/Client";
import Profile from "../../pages/Profile";
import EntrepriseProfile from "../../pages/EnterpriseProfile";

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
  // Defina o estado de autenticação corretamente
  const signed = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Singin />} />
        <Route path="/redifine" element={<Redifine />} />
        <Route path="/home" element={<Private Item={Home} signed={signed} />} />
        <Route path="/Client" element={<Private Item={Client} signed={signed} />} />
        <Route path="/profile/:id" element={<Private Item={() => <Profile clients={clients} />} signed={signed} />} />
        {/* Rota para o perfil da empresa */}
        <Route path="/entrepriseProfile/:cpfCnpj" element={<Private Item={EntrepriseProfile} signed={signed} />} />
      </Routes>
    </BrowserRouter>
  )
};

export default RoutesApp;