import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../../pages/Home";
import Singin from "../../pages/Signin";
import Redifine from "../../pages/Redifine";
import Client from "../../pages/Client";
import Profile from "../../pages/Profile";
import EntrepriseProfile from "../../pages/EnterpriseProfile";
import DocumentsPage from "../../pages/DocumentsPage/DocumentsPage";
import Verification from "../../pages/Verification/index"
import Adm from "../../pages/Adm/index"
import CadastroAdm from "../../pages/CadastroAdm/index"
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import { Loading } from "../../component/Loading";
import { AuthContext } from "../contexts/Auth/AuthContext";

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
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
        ],
      },
      {
        cpfCnpj: 22222222222222,
        razaoSocial: "Tech Team LTDA",
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
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
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
        ],
      },
      {
        cpfCnpj: 33333333333333,
        razaoSocial: "Globo",
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
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
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
        ],
      },
      {
        cpfCnpj: 77777777777777,
        razaoSocial: "Vivo S/A",
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
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
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
        ],
      },
      {
        cpfCnpj: 12593570298715,
        razaoSocial: "Globo",
        logradouro: "Rua do jasmin, 10",
        bairro: "Caetes 3",
        cidade: "Abreu e Lima",
        uf: "PE",
        telefone: "81-9887692454",
        email: "teste@test.com",
        complemento: " casa 1",
        cep: 53545070,
        documents: [
          {
            name: "LAS - licença ambiental simplificada",
            issuanceDate: "28/08/2023",
            expirationDate: "28/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LP - Licença prévia",
            issuanceDate: "29/08/2023",
            expirationDate: "29/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LI - Licença de instalação",
            issuanceDate: "30/08/2023",
            expirationDate: "30/08/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LO - Licença de operação",
            issuanceDate: "31/08/2023",
            expirationDate: "31/08/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf",
          },
          {
            name: "LOC - Licença de operação corretiva",
            issuanceDate: "01/09/2023",
            expirationDate: "01/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CR - Certificado de registro Exercito",
            issuanceDate: "02/09/2023",
            expirationDate: "02/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CRC - Certificado de Registro Cadastral (Polícia Federal)",
            issuanceDate: "03/09/2023",
            expirationDate: "03/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "CLF - Certificado de Licença de Funcionamento",
            issuanceDate: "04/09/2023",
            expirationDate: "04/09/2024",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
          {
            name: "AE - Autorização Especial",
            issuanceDate: "05/09/2023",
            expirationDate: "05/09/2025",
            path: "https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf",
          },
        ],
      },
    ],
  },
  // Adicionar outros clientes aqui...
];

const Private = ({ Item, signed }) => {
  return signed ? <Item /> : <Navigate to="/" />;
};

Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
  signed: PropTypes.bool.isRequired,
};

const RoutesApp = () => {
  // Defina o estado de autenticação corretamente
  const { authenticated, loading, token } = useContext(AuthContext); // Obtenha a função signin do contexto
  if (loading) {
    return <Loading />;
  }

  const signed = authenticated;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Singin />} />
        <Route path="/redifine" element={<Redifine />} />
        <Route path="/verification" element={<Verification />} />
        <Route
          path="/Adm"
          element={
            <RequireAuth>
              <Private Item={Adm} signed={signed} />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Private Item={Home} signed={signed} />
            </RequireAuth>
          }
        />

        <Route
          path="/client"
          element={
            <RequireAuth>
              <Private Item={Client} signed={signed} />
            </RequireAuth>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <Private
              Item={() => <Profile clients={clients} />}
              signed={signed}
            />
          }
        />
        <Route
          path="/entrepriseProfile/:cpfCnpj"
          element={
            <Private
              Item={() => <EntrepriseProfile clients={clients} />}
              signed={signed}
            />
          }
        />
        <Route
          path="/DocumentsPage"
          element={
            <RequireAuth>
              <Private Item={DocumentsPage} signed={signed} />
            </RequireAuth>
          }
        />

        <Route
                  path="/CadastroAdm"
                  element={
                    <RequireAuth>
                      <Private Item={CadastroAdm} signed={signed} />
                    </RequireAuth>
                  }
                />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
