import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Profile = ({ clients }) => {
  const { id } = useParams();
  const client = clients.find((c) => c.id === parseInt(id));

  if (!client) {
    return <div>Cliente não encontrado.</div>;
  }

  return (
    <div>
      <Link to="/home"><button>Voltar para a Home</button></Link>
      <Link to="/client"><button>Voltar para a Lista de Clientes</button></Link>

      <h2>{client.name}</h2>
      <p>Email: {client.email}</p>
      <p>Telefone: {client.mobile}</p>
      <p>Endereço: {client.endereco.rua}, {client.endereco.numero}, {client.endereco.bairro}, {client.endereco.cidade}, {client.endereco.complemento}</p>

      <h3>Documentos:</h3>
      {client.documents.map((document, index) => (
        <DocumentAccordion key={index} document={document} />
      ))}
    </div>
  );
};

const DocumentAccordion = ({ document }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Collapsible
      trigger={
        <TriggerWithIcon name={document.name} isAccordionOpen={isAccordionOpen} />
      }
      triggerWhenOpen={
        <TriggerWithIcon name={document.name} isAccordionOpen={isAccordionOpen} />
      }
      onOpen={toggleAccordion}
      onClose={toggleAccordion}
      transitionTime={200}
    >
      <p>{document.name}</p>
      {/* Aqui você pode adicionar mais detalhes sobre o documento, se necessário */}
    </Collapsible>
  );
};

const TriggerWithIcon = ({ name, isAccordionOpen }) => (
  <div>
    <span>{name}</span>
    {isAccordionOpen ? (
      <FaChevronUp style={{ marginLeft: '5px' }} />
    ) : (
      <FaChevronDown style={{ marginLeft: '5px' }} />
    )}
  </div>
);

export default Profile;
