import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiHomeHeartLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useData } from "@/hooks/useData";
import { formatDate } from "@/helpers/formatDate";
import { Loading } from "@/components/Loading";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Documents } from "@/components/Documents";

import style from "@/pages/DocumentsPage/Documents.module.css";

const DocumentsPage = () => {
  const { error, request } = useData();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsExpiringSoon, setDocumentsExpiringSoon] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showExpiringDocuments, setShowExpiringDocuments] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const soonThreshold = 7;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => setConfirmationMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  useEffect(() => {
    if (documentsExpiringSoon.length > 0) {
      setShowNotification(true);
    }
  }, [documentsExpiringSoon]);

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationButtonClick = () => setShowExpiringDocuments(true);
  const handleCloseExpiringDocuments = () => setShowExpiringDocuments(false);

  // Função para ordenar documentos
  const sortedDocuments = [...documents].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    } else if (sortBy === "validity") {
      comparison = new Date(a.validity) - new Date(b.validity);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Função de filtro para localizar documentos pelo nome ou tipo
  const filteredDocuments = sortedDocuments.filter((document) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const documentName = document.name ? document.name.toLowerCase() : "";
    const documentType = document.type ? document.type.toLowerCase() : "";
    return (
      documentName.includes(searchLower) || documentType.includes(searchLower)
    );
  });

  // Função para destacar o texto
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className={style.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
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
                {showNotification && (
                  <div className={style.notificationContainer}>
                    <button
                      onClick={handleNotificationButtonClick}
                      className={style.showExpiringButton}
                    >
                      <IoIosNotificationsOutline
                        className={style.notification}
                      />
                    </button>
                  </div>
                )}
              </Navigation>
            </div>
          </div>

          {/* Campo de busca */}
          <div className={style.searchContainer}>
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={style.searchInput}
            />
            {/* Filtros de ordenação */}
            <div className={style.sorting}>
              <label>
                Ordenar por:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Nome da Empresa</option>
                  <option value="type">Tipo de Documento</option>
                  <option value="validity">Data de Vencimento</option>
                </select>
              </label>
              <button
                className={style.sortIcons}
                onClick={() => setSortDirection("asc")}
              >
                <FaChevronUp />
              </button>
              <button
                className={style.sortIcons}
                onClick={() => setSortDirection("desc")}
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          {/* Exibe todos os documentos ou os filtrados */}
          <section>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <Documents
                  document={{
                    ...document,
                    name: highlightText(document.name),
                    type: highlightText(document.type),
                  }}
                  key={document._id}
                  handleFormSubmit={loadData}
                  types={types}
                />
              ))
            ) : (
              <p>Nenhum documento encontrado.</p>
            )}
          </section>
        </div>
      </div>

      {/* Exibe os documentos próximos de vencer */}
      {showExpiringDocuments && (
        <div className={style.expiringDocumentsContainer}>
          <h2>Documentos Próximos de Vencer</h2>
          <ul>
            {documentsExpiringSoon.map((document) => (
              <li key={document._id}>
                <FaArrowRight />
                {highlightText(document.name)} - Vencimento em{" "}
                {formatDate(document.validity)}
              </li>
            ))}
          </ul>
          <button onClick={handleCloseExpiringDocuments}>Fechar</button>
        </div>
      )}

      {/* Exibe mensagens de erro e loading */}
      {error && <h1>Não foi possível carregar os dados</h1>}
      {loading && <Loading />}
      {!loading && !error && confirmationMessage && (
        <div>{confirmationMessage}</div>
      )}
      <Footer />
    </section>
  );
};

export default DocumentsPage;
