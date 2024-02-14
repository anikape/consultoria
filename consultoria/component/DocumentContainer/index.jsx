import {useEffect} from "react";
import {Link} from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import {useData} from "../../src/hooks/useData";

export const DocumentContainer = ({data}) => {
  
  const {['data']: document, loading, error, request } = useData()
  
  useEffect(() => {
    request("GET", `/document?company=${data}`, { withCrendentials: true });
  }, []);
    console.log(`Array de documents: ${document}`, `Erros:${error}`, `Loading: ${loading}`)
  
  return (
    <>
    
    {!loading && error && <p>Nenhum documento encontrado </p>}
    
    {!loading && !error && 
    
    <>
       <div>
       <button onClick={() => toggleDocumentAccordion(index)}>
                {document.name} 
                {/* {expandedDocument === index ? "▲" : "▼"} */}
      </button>
       <div>
         <p>Emissão: {document.issuanceDate}</p>
         <p>Expiração: {document.expirationDate}</p>
         <Link to={document.path} target="_blank" download>
          <AiOutlineFilePdf />
         </Link> 
        
          <button onClick={() => handleDeleteDocument(document.id)}>
          Excluir Documento
          </button>
        </div>
      </div>
    </>
    }
    
   
    </>
  );
};
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
