
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './client.module.css'
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import Profile from '../Profile';
import EntrepriseProfile from '../EnterpriseProfile';
import mais from '../../src/assets/mais.png'
import { IoClose } from "react-icons/io5";
import { FaInfoCircle, FaHome } from "react-icons/fa";
import DocumentPage from '../DocumentsPage/DocumentsPage';
import Footer from '../../component/Footer/Footer';


const Client = ({clientsProp  }) => {
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
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
          ],
        },
        {
          cpfCnpj: 22222222222222,
          razaoSocial: "Tech Team LTDA",
          logradouro: "Rua do jasmin, 10",
          bairro: "Caetes 3",
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents:  [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
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
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents:  [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
          ],
        },
        {
          cpfCnpj: 33333333333333,
          razaoSocial: "Globo",
          logradouro: "Rua do jasmin, 10",
          bairro: "Caetes 3",
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents:  [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
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
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
          ],
        },
        {
          cpfCnpj: 77777777777777,
          razaoSocial: "Vivo S/A",
          logradouro: "Rua do jasmin, 10",
          bairro: "Caetes 3",
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents:  [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
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
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
          ],
        },
        {
          cpfCnpj: 12593570298715,
          razaoSocial: "Globo",
          logradouro: "Rua do jasmin, 10",
          bairro: "Caetes 3",
          cidade:"Abreu e Lima",
          uf:"PE",
          telefone: "81-9887692454",
          email: "teste@test.com",
          complemento:" casa 1",
          cep:53545070,
          documents: [
            { name: "LAS - licença ambiental simplificada", issuanceDate: "28/08/2023", expirationDate: "28/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LP - Licença prévia", issuanceDate: "29/08/2023", expirationDate: "29/08/2024" ,path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LI - Licença de instalação", issuanceDate: "30/08/2023", expirationDate: "30/08/2024", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LO - Licença de operação", issuanceDate: "31/08/2023", expirationDate: "31/08/2025", path: "https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf" },
            { name: "LOC - Licença de operação corretiva", issuanceDate: "01/09/2023", expirationDate: "01/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf" },
            { name: "CR - Certificado de registro Exercito", issuanceDate: "02/09/2023", expirationDate: "02/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CRC - Certificado de Registro Cadastral (Polícia Federal)", issuanceDate: "03/09/2023", expirationDate: "03/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "CLF - Certificado de Licença de Funcionamento", issuanceDate: "04/09/2023", expirationDate: "04/09/2024", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
            { name: "AE - Autorização Especial", issuanceDate: "05/09/2023", expirationDate: "05/09/2025", path:"https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf"  },
          ],
        },
      ],
    },
    // Adicionar outros clientes aqui...
  ];

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCnpj, setClientCNPJ] = useState('');
  const [clientRazaoSocial, setClientRazaoSocial] = useState('');
  const [clientRua, setClienteRua] = useState('')
  const [clientNumero, setClientNumero] = useState('')
  const [clientBairro, setClienteBairro] = useState('')
  const [clientComplemento, setClientComplemento] = useState('')
  const [clientCep, setClientcep] = useState('')
  const [clientUf, setClientUf] = useState('')


  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const openModal2 = () => {
    setModal2IsOpen(true);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
  };

  const handleSubmit = (event) => {
    // Lógica para enviar os dados para o backend (chamada à API)
    event.preventDefault();
    // Aqui você pode enviar os dados para o backend usando fetch, axios, etc.
    // Após o sucesso, exiba a mensagem de sucesso e feche o modal
    // Você pode controlar isso usando o estado do React.
    //  setSuccessMessage('Cadastro realizado com sucesso');
    // E depois de alguns segundos, resetar a mensagem e fechar o modal
    // setSuccessMessage('');
    // setModalIsOpen(false);
  };


  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClients, setExpandedClients] = useState(
    clients.reduce((acc, client) => {
      acc[client.id] = true;
      return acc;
    }, {})
  );
  const [expandedEnterpriseIndex, setExpandedEnterpriseIndex] = useState(-1);
  const [searchCnpj, setSearchCnpj] = useState('');

    // Define o elemento do aplicativo para evitar o erro
    ReactModal.setAppElement('#root'); // Use o seletor do elemento raiz do seu aplicativo

  
 

  const openModal = (client) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModalOpen(false);
  };


  const handleEnterpriseAccordionClick = (index) => {
    setExpandedEnterpriseIndex(index === expandedEnterpriseIndex ? -1 : index);
  };

  //**Funções de Busca */

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setExpandedClients({}); // Reset all client accordions on search
  
    // Filter and expand clients that match the search term
    const newExpandedClients = {};
    clients.forEach((client) => {
      if (
        client.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        client.entreprise.some(
          (enterprise) =>
            enterprise.razaoSocial.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
      ) {
        newExpandedClients[client.id] = true;
      }
    });
    setExpandedClients(newExpandedClients); // Update the expanded state
  };

  const handleSearchCnpj = (event) => {
    setSearchCnpj(event.target.value);
    setExpandedClients({}); // Reset all client accordions on CNPJ search
    setExpandedEnterpriseIndex(-1); // Reset expanded enterprise accordion on CNPJ search
  
    // Filter and expand clients that match the CNPJ search
    const newExpandedClients = {};
    clients.forEach((client) => {
      if (client.entreprise.some((enterprise) => enterprise.cpfCnpj.toString().includes(searchCnpj))) {
        newExpandedClients[client.id] = true;
      }
    });
    setExpandedClients(newExpandedClients); // Update the expanded state
  };
  
  const filteredClientsByCnpj = clients.filter((client) =>
  client.entreprise.some((enterprise) =>
    enterprise.cpfCnpj.toString().includes(searchCnpj)
  ) && expandedClients[client.id]
);

const filteredClients = clients.filter((client) => {
  const isClientExpanded = expandedClients[client.id];
  const isClientNameMatch = client.name.toLowerCase().includes(searchTerm.toLowerCase());

  // Only include the client in the filtered list if it matches the search term and is expanded
  return isClientExpanded && isClientNameMatch;
});

  return (
    <section className={style.container}>
    <div className={style.content}>
      <Link className={style.buttonHome} to="/home">
        <button ><FaHome  className={style.home}/></button>
      </Link>
      <h1 className={style.title}>Clientes</h1>
    
      <section className={style.section}>
      <div className={style.find}>
        <label className={style.search}   htmlFor="searchCnpj"> CNPJ:</label>
        <input className={style.searchInput}
          type="text"
          placeholder="Buscar por CNPJ..."
          value={searchCnpj}
          onChange={handleSearchCnpj}
        />
      </div>

      {/*Modal de cadastro*/}
      <div className={style.modalContent}>
      <button className={style.buttonModal} onClick={openModal2}><img src={mais} alt='simbolo de mais'/>Novo Cadastro</button>
      <Modal 
        isOpen={modal2IsOpen}
        onRequestClose={closeModal2}
        contentLabel="Modal cadastro de cliente"
        className={style.modalContainer}
      >
        <h3 className={style.h3}> Cliente</h3>

        <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="name">Nome:</label>
            <input
              type="name"
              name="Nome"
              value={clientName}
              placeholder="Infome o nome"
              required
              className={style.input}
              id="name"
              onChange={(e) => setClientName(e.target.value)}

            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              value={clientEmail}
              placeholder="Infome E-mail"
              required
              className={style.input}
              id="email"
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="name">Razão Social:</label>
            <input
              type="name"
              name="Razão Social"
              value={clientRazaoSocial}
              placeholder="Infome E-mail"
              required
              className={style.input}
              id=""
              onChange={(e) => setClientRazaoSocial(e.target.value)}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}  htmlFor="name">CNPJ:</label>
            <input
              type="name"
              name="CNPJ"
              value={clientCnpj}
              placeholder="Infome o CNPJ"
              required
              className={style.input}
              id=""
              onChange={(e) => setClientCNPJ(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
  <label className={style.label} htmlFor="street">Rua/Logradouro:</label>
  <input
    type="text"
    name="street"
    value={clientRua}
    placeholder="Informe a rua/logradouro"
    required
    className={style.input}
    id="street"
    onChange={(e) => setClienteRua(e.target.value)}
  />
</div>

<div className={style.inputGroup}>
  <label className={style.label} htmlFor="number">Número:</label>
  <input
    type="text"
    name="number"
    value={clientNumero}
    placeholder="Informe o número"
    required
    className={style.input}
    id="number"
    onChange={(e) => setClientNumero(e.target.value)}
  />
</div>

<div className={style.inputGroup}>
  <label className={style.label} htmlFor="neighborhood">Bairro:</label>
  <input
    type="text"
    name="neighborhood"
    value={clientBairro}
    placeholder="Informe o bairro"
    required
    className={style.input}
    id="neighborhood"
    onChange={(e) => setClienteBairro(e.target.value)}
  />
</div>

<div className={style.inputGroup}>
  <label className={style.label} htmlFor="complement">Complemento:</label>
  <input
    type="text"
    name="complement"
    value={clientComplemento}
    placeholder="Informe o complemento"
    className={style.input}
    id="complement"
    onChange={(e) => setClientComplemento(e.target.value)}
  />
</div>

<div className={style.inputGroup}>
  <label className={style.label} htmlFor="cep">CEP:</label>
  <input
    type="text"
    name="cep"
    value={clientCep}
    placeholder="Informe o CEP"
    required
    className={style.input}
    id="cep"
    onChange={(e) => setClientcep(e.target.value)}
  />
</div>

<div className={style.inputGroup}>
  <label className={style.label} htmlFor="state">UF:</label>
  <input
    type="text"
    name="state"
    value={clientUf}
    placeholder="Informe a UF"
    required
    className={style.input}
    id="state"
    onChange={(e) => setClientUf(e.target.value)}
  />
</div>
<div className={style.buttons}>
  <button className={style.button1} type="submit">Salvar</button>
  <button className={style.button2}  onClick={closeModal2}>Cancelar</button>
</div>
          
        </form>
      </Modal>
    </div>
</section>
      
      {filteredClients.map((client) => (
        <div
          key={client.id}
          className={style.clientList}
        >
          <button className={style.buttonName} onClick={() => openModal(client)}>
            {client.name}{' '}{' '}<FaInfoCircle className={style.icon} />
           
          </button>
          {expandedClients[client.id] && (
            <div className={style.contentClient}>
             
              {client.entreprise.map((enterprise, index) => (
                <div key={index}>
                  <button className={style.buttonEntreprise} onClick={() => handleEnterpriseAccordionClick(index)}>
                    {enterprise.razaoSocial}{' '}
                    {expandedEnterpriseIndex === index ? '▲' : '▼'}
                  </button>
                  
                  {expandedEnterpriseIndex === index && (
                    <div className={style.infoEnterprise}>
                      <p className={style.infoName}>CNPJ: {enterprise.cpfCnpj}</p>
                      <Link to={`/entrepriseProfile/${enterprise.cpfCnpj}`}>
                        <button className={style.buttonProfile}>PERFIL</button>
                      </Link>
                      {/* Passando os dados da empresa para o EntrepriseProfile */}
                      <EntrepriseProfile enterprise={enterprise} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'black',
            width: '350px', 
            height:'250px',
            margin: 'auto',
            background: '#B9C7C4',
            padding: '20px'
          }

        }}
      >
        {selectedClient && (
          <div className={style.modalInfo}>
          <div className={style.closeButtonContainer}>
            <button onClick={closeModal} style={{ border: 'none' }}>
              <IoClose className={style.close} />
            </button>
          </div>
          <h2 className={style.modalh2}>Dados do Cliente</h2>
          <p className={style.modalp}>{selectedClient.name}</p>
          <p className={style.modalp}>Email: {selectedClient.email}</p>
          <p className={style.modalp}>Telefone: {selectedClient.mobile}</p>
        </div>
        )}
      </ReactModal>
    </div>

    <Footer />
    </section>
  );
};


export default Client;
