import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { RiHomeHeartLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useData } from "../../src/hooks/useData";
import { formatDate } from "../../src/helpers/formatDate";

import { Loading } from "../../component/Loading";
import Footer from "../../component/Footer";
import { Navigation } from "../../component/Navigation";
import { Documents } from "../../component/Documents";

import style from "./Documents.module.css";

const DocumentsPage = () => {
  const { error, request } = useData();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsExpiringSoon, setDocumentsExpiringSoon] = useState([]);
  const [filterBy, setFilterBy] = useState("date"); // "date", "type" ou "company"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" ou "desc"
  const soonThreshold = 7;

  useEffect(() => {
    loadData();
  }, []); 

  const loadData = async () => {
    setLoading(true);
    try {
      const [companysData, typesData] = await Promise.all([
        request("get", "document", { withCredentials: true }),
        request("get", "types", { withCredentials: true }),
      ]);

      setDocuments(companysData.json);
      setTypes(typesData.json);

      const today = new Date();
      const expiringSoon = companysData.json.filter((document) => {
        const validityDate = new Date(document.validity);
        const differenceInDays = Math.ceil(
          (validityDate - today) / (1000 * 60 * 60 * 24)
        );
        return differenceInDays >= 0 && differenceInDays <= soonThreshold;
      });
      setDocumentsExpiringSoon(expiringSoon);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para ordenar por data de vencimento
  const sortByDate = (docs) => {
    return [...docs].sort((a, b) => {
      const dateA = new Date(a.validity);
      const dateB = new Date(b.validity);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  // Função para ordenar por tipo de documento
  const sortByType = (docs) => {
    return [...docs].sort((a, b) => {
      const typeA = a.type.toLowerCase();
      const typeB = b.type.toLowerCase();
      if (sortOrder === "asc") {
        return typeA > typeB ? 1 : -1;
      } else {
        return typeA < typeB ? 1 : -1;
      }
    });
  };

  // Função para ordenar por nome da empresa
  const sortByCompany = (docs) => {
    return [...docs].sort((a, b) => {
      const companyA = a.company?.toLowerCase() || "";
      const companyB = b.company?.toLowerCase() || "";
      if (sortOrder === "asc") {
        return companyA > companyB ? 1 : -1;
      } else {
        return companyA < companyB ? 1 : -1;
      }
    });
  };

  // Documentos filtrados com base no critério selecionado
  const filteredDocuments = () => {
    if (filterBy === "date") {
      return sortByDate(documents);
    } else if (filterBy === "type") {
      return sortByType(documents);
    } else if (filterBy === "company") {
      return sortByCompany(documents);
    }
  };

  return (
    <section className={style.Document}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.header}>
            <div className={style.headingWrapper}>
              <h1 className={style.title}>Documentos</h1>
              <Navigation>
                <Link className={style.buttons} to="/home">
                  <RiHomeHeartLine className={style.home} />
                </Link>
                <Link to="/client" className={style.buttons}>
                  <FaUserGroup />
                </Link>
              </Navigation>
            </div>
          </div>

          {/* Filtros de ordenação */}
          <div className={style.filters}>
            <label>
              Ordenar por:
              <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                <option value="date">Data de Vencimento</option>
                <option value="type">Tipo de Documento</option>
                <option value="company">Nome da Empresa</option>
              </select>
            </label>

            <label>
              Ordem:
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </label>
          </div>

          <section>
            {filteredDocuments().map((document) => (
              <Documents
                document={document}
                key={document._id}
                handleFormSubmit={loadData}
                types={types}
              />
            ))}
          </section>
        </div>
      </div>

      {loading && <Loading />}
      {error && <h1>Não foi possível carregar os dados</h1>}

      <Footer />
    </section>
  );
};

export default DocumentsPage;
