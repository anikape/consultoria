import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineFilePdf } from "react-icons/ai";

const EntrepriseProfile = ({ clients }) => {
  const { cpfCnpj } = useParams();


  // Estado para controlar a exibição do acordeão
  const [expandedDocument, setExpandedDocument] = useState(null);

  // Função para expandir/contrair acordeão
  const toggleDocumentAccordion = (documentIndex) => {
    if (expandedDocument === documentIndex) {
      setExpandedDocument(null);
    } else {
      setExpandedDocument(documentIndex);
    }
  };

  // Função para excluir um documento
  const handleDeleteDocument = async (documentId) => {
    try {
      // Fazer uma solicitação para o backend para excluir o documento pelo ID
      // Por exemplo: axios.delete(`/api/documents/${documentId}`);
      
      // Atualizar o estado local para refletir a exclusão
      setExpandedDocument(null);
    } catch (error) {
      console.error('Erro ao excluir o documento:', error);
    }
  };

  // Verifica se a prop "clients" está definida
  if (!clients) {
    return <h1></h1>;
  }

  // Encontra a empresa correspondente ao cpfCnpj
  const enterprise = clients
    .flatMap(client => client.entreprise)
    .find(enterprise => enterprise.cpfCnpj.toString() === cpfCnpj);

  // Verifica se a empresa foi encontrada
  if (!enterprise) {
    return <h1>Enterprise not found</h1>;
  }

  return (
    
    <div>

  <Link to="/client">
        <button>Voltar para Página do Cliente</button>
      </Link>
      <Link to="/home">
        <button>Ir para Página Inicial</button>
      </Link>
      
      <h1>{enterprise.razaoSocial}</h1>
      {/* Exibir outras informações da empresa */}

      <section style={{ display:'grid', gridTemplateColumns: '1fr 1fr'}}>

      <div style={{ margin:  '1em'}}>
      <h2>CPF/CNPJ</h2> <span>{enterprise.cpfCnpj}</span>
      </div>
     

      <div>
      <h2>E-mail</h2> <span>{enterprise.email}</span>
      </div>
      
      <div>
      <h2>Telefone Celular</h2> <span>{enterprise.telefone}</span>
      </div>
     

      <div>
      <h2>Telefone Fixo</h2> <span></span>
      </div>
      

      <div>
      <h2>Rua/Logradouro</h2> <span>{enterprise.logradouro}</span>
      </div>
      

      <div>
      <h2>Bairro</h2> <span>{enterprise.bairro}</span>
      </div>
      

      <div>
      <h2>Complemento</h2> <span>{enterprise.complemento}</span>
      </div>
    

      <div>
      <h2>Cidade</h2> <span>{enterprise.cidade}</span>
      </div>
      

      <div>
      <h2>UF</h2> <span>{enterprise.uf}</span>
      </div>
      

      <div>
      <h2>CEP</h2> <span>{enterprise.cep}</span>
      </div>
      
      </section>

      <h2>Documentos:</h2>
      {enterprise.documents.map((document, index) => (
        <div key={index}>
          <button onClick={() => toggleDocumentAccordion(index)}>
            {document.name} {expandedDocument === index ? '▲' : '▼'}
          </button>
          {expandedDocument === index && (
            <div>
              <p>Emissão: {document.issuanceDate}</p>
              <p>Expiração: {document.expirationDate}</p>
              <Link to={document.path} target="_blank" download >
                <AiOutlineFilePdf />
               
              </Link>
              {/* Opção de exclusão do banco de dados */}
              <button onClick={() => handleDeleteDocument(document.id)}>
                Excluir Documento
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    
  );
};

export default EntrepriseProfile;
