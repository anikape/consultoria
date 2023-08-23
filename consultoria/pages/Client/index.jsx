
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile';
import EntrepriseProfile from '../EnterpriseProfile';

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


  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClients, setExpandedClients] = useState(
    clients.reduce((acc, client) => {
      acc[client.id] = true;
      return acc;
    }, {})
  );
  const [expandedEnterpriseIndex, setExpandedEnterpriseIndex] = useState(-1);
  const [searchCnpj, setSearchCnpj] = useState('');

  
  const toggleClientAccordion = (clientId) => {
    setExpandedClients((prevExpandedClients) => ({
      ...prevExpandedClients,
      [clientId]: !prevExpandedClients[clientId],
    }));
    setExpandedEnterpriseIndex(-1); // Reset expanded enterprise accordion on client accordion click
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
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>Página do Cliente</h1>
      <div>
        <label htmlFor="search">Buscar por Nome:</label>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label htmlFor="searchCnpj">Buscar por CNPJ:</label>
        <input
          type="text"
          placeholder="Buscar por CNPJ..."
          value={searchCnpj}
          onChange={handleSearchCnpj}
        />
      </div>

      {filteredClients.map((client) => (
      <div
        key={client.id}
        style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}
      >
          <button onClick={() => toggleClientAccordion(client.id)}>
            {client.name}{' '}
           
            {expandedClients[client.id] ? '▲' : '▼'}
          </button>
          {expandedClients[client.id] && (
            <div>
              <h2>Empresas:</h2>
              {client.entreprise.map((enterprise, index) => (
                <div key={index}>
                  <button onClick={() => handleEnterpriseAccordionClick(index)}>
                    {enterprise.razaoSocial}{' '}
                    {expandedEnterpriseIndex === index ? '▲' : '▼'}
                  </button>
                  {/* {expandedEnterpriseIndex === index && (
                    <div>
                      <p>CNPJ: {enterprise.cpfCnpj}</p>
                      <Link to={`/entrepriseProfile/${enterprise.cpfCnpj}`}>
                        <button>Ver Perfil da Empresa</button>
                      </Link>
                    </div>
                  )} */}

{expandedEnterpriseIndex === index && (
  <div>
    <p>CNPJ: {enterprise.cpfCnpj}</p>
    <Link to={`/entrepriseProfile/${enterprise.cpfCnpj}`}>
      <button>Ver Perfil da Empresa</button>
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
    </div>
  );
};

export default Client;