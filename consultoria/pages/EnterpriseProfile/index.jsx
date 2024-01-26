import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import Footer from "../../component/Footer";
import style from "./enterprise.module.css";
import { useData } from "../../src/hooks/useData";

const EntrepriseProfile = () => {
  const { id } = useParams();
  console.log(id);

  const { ["data"]: company, loading, error, request } = useData();

  useEffect(() => {
    request("GET", `company/${id}`, { withCrendentials: true });
  }, []);
  console.log(company);
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
      console.error("Erro ao excluir o documento:", error);
    }
  };

  // Verifica se a prop "clients" está definida
  if (!company) {
    return <h1>Não tem</h1>;
  }

  // Encontra a empresa correspondente ao cpfCnpj
  // const enterprise = clients
  //   .flatMap((client) => client.entreprise)
  //   .find((enterprise) => enterprise.cpfCnpj.toString() === cpfCnpj);

  // Verifica se a empresa foi encontrada
  if (!company) {
    return <h1>Enterprise not found</h1>;
  }

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.button}>
          <Link to="/client" className={style.buttons}>
            <button> Cliente</button>
          </Link>

          <Link to="/home" className={style.buttons}>
            <button>HOME</button>
          </Link>
        </div>
        <h1 className={style.title1}>{company.companyName}</h1>
        {/* Exibir outras informações da empresa */}

        <section className={style.profile}>
          <div>
            <h2>CPF/CNPJ</h2>
            <span>{company.cnpj}</span>
          </div>

          <div>
            <h2>E-mail</h2>
            <span>{company.email}</span>
          </div>

          <div>
            <h2>Telefone Celular</h2>
            <span>{company.cellprone}</span>
          </div>

          <div>
            <h2>Telefone Fixo</h2>
            <span>{company.prone}</span>
          </div>

          <div>
            <h2>Rua/Logradouro</h2>
            <span>{company.address}</span>
          </div>

          <div>
            <h2>Bairro</h2>
            <span>{company.bairro}</span>
          </div>

          <div>
            <h2>Complemento</h2>
            <span>{company.complemento}</span>
          </div>

          <div>
            <h2>Cidade</h2>
            <span>{company.city}</span>
          </div>

          <div>
            <h2>UF</h2>
            <span>{company.state}</span>
          </div>

          <div>
            <h2>CEP</h2>
            <span>{company.zipcode}</span>
          </div>
        </section>

        <section className={style.documents}>
          <h2>Documentos:</h2>

          {error ? "Não foi possivel carregar os dados" : "dados"}

          {/* {company.documents.map((document, index) => (
            <div key={index}>
              <button onClick={() => toggleDocumentAccordion(index)}>
                {document.name} {expandedDocument === index ? "▲" : "▼"}
              </button>
              {expandedDocument === index && (
                <div>
                  <p>Emissão: {document.issuanceDate}</p>
                  <p>Expiração: {document.expirationDate}</p>
                  <Link to={document.path} target="_blank" download>
                    <AiOutlineFilePdf />
                  </Link> */}
          {/* Opção de exclusão do banco de dados */}
          {/* <button onClick={() => handleDeleteDocument(document.id)}>
                    Excluir Documento
                  </button>
                </div> */}
          {/* )} */}
          {/* </div>
          ))} */}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EntrepriseProfile;
