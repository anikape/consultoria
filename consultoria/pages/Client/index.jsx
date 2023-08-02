import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Client = () => {
  const clients = [
    {
      id: 1,
      name: "Ana Santos",
      email: "teste@test.com",
      mobile: 81988693599,
      entreprise: [
        {
          cpfCnpj: 12345678910,
          razaoSocial: "Edficações LTDA",
          endereco: "Rua do jasmin",
          telefone: "81-9887692454",
        },
        {
          cpfCnpj: 222222222,
          razaoSocial: "Tech Team LTDA",
          endereco: "Rua do Leme",
          telefone: "81-9887692454",
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
          cpfCnpj: 4444444,
          razaoSocial: "Stefanini",
          endereco: "Rua do Cravo",
          telefone: "81-9887692454",
        },
        {
          cpfCnpj: 3333333,
          razaoSocial: "Globo",
          endereco: "Rua do Amarelo",
          telefone: "81-9887692454",
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
          cpfCnpj: 888888888,
          razaoSocial: "Oi Telecom",
          endereco: "Rua da Alegria",
          telefone: "81-9887692454",
        },
        {
          cpfCnpj: 777777777,
          razaoSocial: "Vivo S/A",
          endereco: "Rua Paralela",
          telefone: "81-9887692454",
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
          cpfCnpj: 4444444,
          razaoSocial: "Fync",
          endereco: "Rua do Cravo",
          telefone: "81-9887692454",
        },
        {
          cpfCnpj: 3333333,
          razaoSocial: "Globo",
          endereco: "Rua do Amarelo",
          telefone: "81-9887692454",
        },
      ],
    },
    // Adicionar outros clientes aqui...
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [expandedEnterpriseIndex, setExpandedEnterpriseIndex] = useState(-1);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setExpandedClientId(null); // Reset expanded accordion on search
    setExpandedEnterpriseIndex(-1); // Reset expanded enterprise accordion on search
  };

  const filteredClients = clients.filter((client) => {
    const { name, entreprise } = client;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseSearchTerm) ||
      entreprise.some(
        (enterprise) =>
          enterprise.cpfCnpj.toString().includes(lowerCaseSearchTerm) ||
          enterprise.razaoSocial.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  });

  const handleAccordionClick = (clientId) => {
    setExpandedClientId(clientId === expandedClientId ? null : clientId);
    setExpandedEnterpriseIndex(-1); // Reset expanded enterprise accordion on client accordion click
  };

  const handleEnterpriseAccordionClick = (index) => {
    setExpandedEnterpriseIndex(index === expandedEnterpriseIndex ? -1 : index);
  };

  return (
    <div>
      <Link to="/home"><button>Home</button></Link>
      <h1>Página do Cliente</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nome, CNPJ ou razão social..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredClients.map((client) => (
        <div key={client.id}>
          <button onClick={() => handleAccordionClick(client.id)}>
            {client.name} {expandedClientId === client.id ? '▲' : '▼'}
          </button>
          {expandedClientId === client.id && (
            <div>
              {client.entreprise.map((enterprise, index) => (
                <div key={index}>
                  <button onClick={() => handleEnterpriseAccordionClick(index)}>
                    {enterprise.razaoSocial} {expandedEnterpriseIndex === index ? '▲' : '▼'}
                  </button>
                  {expandedEnterpriseIndex === index && (
                    <div>
                      <p>CNPJ: {enterprise.cpfCnpj}</p>
                      <p>Razão Social: {enterprise.razaoSocial}</p>
                      <p>Endereço: {enterprise.endereco}</p>
                      <p>Telefone: {enterprise.telefone}</p>
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
