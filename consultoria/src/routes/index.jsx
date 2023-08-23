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
      entreprise: [
        {
          cpfCnpj: 12345678910000,
          razaoSocial: "Edficações LTDA",
          logradouro: "Rua do jasmin, 10",
          bairro: "Caetes 3",
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
        {
          cpfCnpj: 22222222222222,
          razaoSocial: "Tech Team LTDA",
          endereco: "Rua do Leme",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Jesica Santana",
      email: "teste@test.com",
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 44444444444444,
          razaoSocial: "Stefanini",
          endereco: "Rua do Cravo",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
        {
          cpfCnpj: 33333333333333,
          razaoSocial: "Globo",
          endereco: "Rua do Amarelo",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Well Nobre",
      email: "teste@test.com",
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 88888888888888,
          razaoSocial: "Oi Telecom",
          endereco: "Rua da Alegria",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
          { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
          { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
          { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
          { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
          { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
          { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
          { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
          { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
        {
          cpfCnpj: 77777777777777,
          razaoSocial: "Vivo S/A",
          endereco: "Rua Paralela",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
          { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
          { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
          { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
          { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
          { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
          { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
          { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
          { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Yashina Gomes",
      email: "teste@test.com",
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 99999999999999,
          razaoSocial: "Fync",
          endereco: "Rua do Cravo",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
        {
          cpfCnpj: 12593570298715,
          razaoSocial: "Globo",
          endereco: "Rua do Amarelo",
          telefone: "81-9887692454",
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025" },
          { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" },
          { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024" },
          { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025" },
          { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024" },
          { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024" },
          { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025" },
          { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024" },
          { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025" },
          ],
        },
      ],
    },
    // Adicionar outros clientes aqui...
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
        {/* <Route path="/entrepriseProfile/:cpfCnpj" element={<Private Item={EntrepriseProfile} signed={signed} />} /> */}
        <Route
  path="/entrepriseProfile/:cpfCnpj"
  element={<Private Item={() => <EntrepriseProfile clients={clients} />} signed={signed} />}
/>

      </Routes>
    </BrowserRouter>
  )
};

export default RoutesApp;