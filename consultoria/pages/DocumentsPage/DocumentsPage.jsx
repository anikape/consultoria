import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useData } from "../../src/hooks/useData";
import { Loading } from "../../component/Loading/index";
import { FaInfoCircle, FaHome } from "react-icons/fa";
import style from "./Documents.module.css";
import pdf from "../../src/assets/pdf.png";
import edity from "../../src/assets/edity.png";
import excluir from "../../src/assets/delittt.png";
import home from "../../src/assets/home.png";
import {
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiFillFilePdf,
  AiFillSetting,
} from "react-icons/ai";
import Footer from "../../component/Footer";


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const DocumentsPage = () => {
   
  const {["data"]: documents, loading, error, request} = useData();
  
   useEffect(() => {
    request("get", "document", { withCredentials: true });
  }, [request]);
  
    
  return (
    
    <div className={style.documentContainer}>
      
      {error && <h1>Não foi possivel carregar os dados</h1>}
      {loading && <Loading/>}
      {!loading && !error && <>
      
      <Link className={style.homeButton} to="/home">
        <button>
          <img src={home} className={style.home} alt="" />
        </button>
      </Link>
      
      <section className={style.tableContent}>
        <table>
          <thead>
            <tr>
              <th className={style.infos}>#</th>
              <th className={style.infos}>Documento</th>
              <th className={style.infos}>Tipo</th>
              <th className={style.infos}>Empresa</th>
              <th className={style.infos}>Emissão</th>
              <th className={style.infos}>Vencimento</th>
              <th className={style.infos}>
                <AiFillSetting />
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? <Loading/> : <>
            
            {documents.map((document) => (
              <tr key={document._id}>
                <td>#</td>
                <td>{document.name}</td>
                <td>{document.type}</td>
                <td>{document.client}</td>
                <td>{formatDate(document.emission)}</td>
                <td>{formatDate(document.validity)}</td>
                <td>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={style.documentsIcons}
                      src={pdf}
                      alt=""
                    />
                  </a>
                  <button className={style.iconButton}>
                    <img
                      className={style.documentsIcons}
                      src={excluir}
                      alt=""
                    />
                  </button>
                  <button className={style.iconButton}>
                    <img
                      className={style.documentsIcons}
                      src={edity}
                      alt=""
                    />
                  </button>
                </td>
              </tr>
            ))}
            
            </>}
          </tbody>
        </table>
      </section>
      </>}

      <Footer />
    </div>
  );
};

export default DocumentsPage;
