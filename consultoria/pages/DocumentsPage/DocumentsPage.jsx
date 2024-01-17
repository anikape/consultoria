import React, { useState } from "react";
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
  const [clientBack, loadingClient, error2] = useData({
    method: "GET",
    url: "client",
    withCredentials: true,
  });

  const [documents, loading, error] = useData({
    method: "GET",
    url: "document",
    withCredentials: true,
  });

  return (
    <div className={style.documentContainer}>
      <Link className={style.homeButton} to="/home">
        <button>
          {" "}
          <img src={home} className={style.home} alt="" />
        </button>
      </Link>

      <section className={style.tableContent}>
        <table>
          <thead>
            <tr>
              <th className={style.infos}> </th>
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
            {documents.map((itens) => (
              <tr key={itens._id}>
                <td></td>
                <td>{itens.name}</td>
                <td>{itens.type}</td>
                <td>{itens.client}</td>
                <td>{formatDate(itens.emission)}</td>
                <td>{formatDate(itens.validity)}</td>
                <td>
                  <a
                    href={itens.url}
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
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
};

export default DocumentsPage;
