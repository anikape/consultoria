import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaHome } from "react-icons/fa";
import style from './Documents.module.css';
import {
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiFillFilePdf,
  AiFillSetting,
} from 'react-icons/ai';
import Footer from '../../component/Footer/Footer'

const DocumentsPage = () => {
  const [orderBy, setOrderBy] = useState('issuanceDate');
  const [searchIssuanceDate, setSearchIssuanceDate] = useState('');
  const [searchExpirationDate, setSearchExpirationDate] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Ana Santos',
      email: 'teste@test.com',
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 12345678910000,
          razaoSocial: 'Edficações LTDA',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
        {
          cpfCnpj: 22222222222222,
          razaoSocial: 'Tech Team LTDA',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Jesica Santana',
      email: 'teste@test.com',
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 44444444444444,
          razaoSocial: 'Stefanini',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
        {
          cpfCnpj: 33333333333333,
          razaoSocial: 'Globo',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Well Nobre',
      email: 'teste@test.com',
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 88888888888888,
          razaoSocial: 'Oi Telecom',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
        {
          cpfCnpj: 77777777777777,
          razaoSocial: 'Vivo S/A',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Yashina Gomes',
      email: 'teste@test.com',
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 99999999999999,
          razaoSocial: 'Fync',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
        {
          cpfCnpj: 12593570298715,
          razaoSocial: 'Globo',
          logradouro: 'Rua do jasmin, 10',
          bairro: 'Caetes 3',
          cidade: 'Abreu e Lima',
          uf: 'PE',
          telefone: '81-9887692454',
          email: 'teste@test.com',
          complemento: ' casa 1',
          cep: 53545070,
          documents: [
            {
              name: 'LAS - licença ambiental simplificada',
              issuanceDate: '28/08/2023',
              expirationDate: '28/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LP - Licença prévia',
              issuanceDate: '29/08/2023',
              expirationDate: '29/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LI - Licença de instalação',
              issuanceDate: '30/08/2023',
              expirationDate: '30/08/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LO - Licença de operação',
              issuanceDate: '31/08/2023',
              expirationDate: '31/08/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/67675be06057dbe5f0e4-2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            },
            {
              name: 'LOC - Licença de operação corretiva',
              issuanceDate: '01/09/2023',
              expirationDate: '01/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CR - Certificado de registro Exercito',
              issuanceDate: '02/09/2023',
              expirationDate: '02/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CRC - Certificado de Registro Cadastral (Polícia Federal)',
              issuanceDate: '03/09/2023',
              expirationDate: '03/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'CLF - Certificado de Licença de Funcionamento',
              issuanceDate: '04/09/2023',
              expirationDate: '04/09/2024',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
            {
              name: 'AE - Autorização Especial',
              issuanceDate: '05/09/2023',
              expirationDate: '05/09/2025',
              path: 'https://uploadsdocspdf.s3.amazonaws.com/3d655bef14d4d96b10d2-MarioCesar_CV.pdf',
            },
          ],
        },
      ],
    },
    // Adicionar outros clientes aqui...
  ];

  const sortClientsByDate = (dateField) => {
    return clients.sort((a, b) => {
      const datesA = a.entreprise.flatMap((e) =>
        e.documents.map((doc) => new Date(doc[dateField])),
      );
      const datesB = b.entreprise.flatMap((e) =>
        e.documents.map((doc) => new Date(doc[dateField])),
      );
      return datesA[0] - datesB[0];
    });
  };

  const sortedClients =
    orderBy === 'issuanceDate'
      ? sortClientsByDate('issuanceDate')
      : sortClientsByDate('expirationDate');

  const filteredClients = sortedClients.filter((client) => {
    const issuanceDate = searchIssuanceDate.trim();
    const expirationDate = searchExpirationDate.trim();

    return client.entreprise.some((entreprise) =>
      entreprise.documents.some(
        (doc) =>
          doc.issuanceDate.includes(issuanceDate) ||
          doc.expirationDate.includes(expirationDate),
      ),
    );
  });

  return (
    <div className={style.documentContainer}>
      <Link className={style.homeButton} to="/home">
      <button ><FaHome className={style.home}/></button>
      </Link>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th className={style.infos}>Documento</th>
            <th className={style.infos}>Tipo</th>
            <th className={style.infos}>Empresa</th>
            <th className={style.infos}> Emissão</th>
            <th className={style.infos}>Vencimento</th>
            <th className={style.infos}>
              <AiFillSetting />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) =>
            client.entreprise.flatMap((entreprise) =>
              entreprise.documents.map((doc, index) => (
                <tr key={index}>
                  <td></td>
                  <td>{doc.name}</td>
                  <td>{doc.name}</td>
                  <td>{entreprise.razaoSocial}</td>
                  <td>{doc.issuanceDate}</td>
                  <td>{doc.expirationDate}</td>
                  <td>
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiFillFilePdf className={style.documentsIcons} />
                      <button>
                        <AiTwotoneDelete className={style.documentsIcons} />
                      </button>
                      <button>
                        <AiTwotoneEdit className={style.documentsIcons} />
                      </button>
                    </a>
                  </td>
                </tr>
              )),
            ),
          )}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default DocumentsPage;
