import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaUserGroup } from 'react-icons/fa6';
import { RiHomeHeartLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Importando ícones para as setas

import { useData } from '../../src/hooks/useData';
import { formatDate } from '../../src/helpers/formatDate';

import { Loading } from '../../component/Loading';
import Footer from '../../component/Footer';
import { Navigation } from '../../component/Navigation';
import { Documents } from '../../component/Documents';

import style from './Documents.module.css';

const DocumentsPage = () => {
  const { error, request } = useData();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsExpiringSoon, setDocumentsExpiringSoon] = useState([]);
  const soonThreshold = 7; // Limite de dias para considerar como "próximo de vencer"
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const [deletedDocumentId, setDeletedDocumentId] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // Inicialmente false
  const [showExpiringDocuments, setShowExpiringDocuments] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // Ordenação inicial
  const [sortDirection, setSortDirection] = useState('asc'); // Direção da ordenação

  useEffect(() => {
    loadData();
  }, []); // Atualiza quando a página carrega

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage(''); // Limpa a mensagem após 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [confirmationMessage]);

  useEffect(() => {
    if (documentsExpiringSoon.length > 0) {
      setShowNotification(true); // Exibe notificação se houver documentos próximos do vencimento
    }
  }, [documentsExpiringSoon]); // Atualiza quando documentsExpiringSoon muda

  const onSubmitModalForm = () => {
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [companysData, typesData] = await Promise.all([
        request('get', 'document', { withCredentials: true }),
        request('get', 'types', { withCredentials: true }),
      ]);

      setDocuments(companysData.json);
      setTypes(typesData.json);

      const today = new Date();
      const expiringSoon = companysData.json.filter((document) => {
        const validityDate = new Date(document.validity);
        const differenceInDays = Math.ceil(
          (validityDate - today) / (1000 * 60 * 60 * 24),
        );
        return differenceInDays >= 0 && differenceInDays <= soonThreshold;
      });
      setDocumentsExpiringSoon(expiringSoon);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationButtonClick = () => {
    setShowExpiringDocuments(true); // Mostra lista de documentos próximos do vencimento
  };

  const handleCloseExpiringDocuments = () => {
    setShowExpiringDocuments(false); // Fecha a lista de documentos
  };

  // Função para ordenar documentos
  const sortedDocuments = [...documents].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name); // Ordena por nome da empresa
    } else if (sortBy === 'type') {
      comparison = a.type.localeCompare(b.type); // Ordena por tipo de documento
    } else if (sortBy === 'validity') {
      comparison = new Date(a.validity) - new Date(b.validity); // Ordena por data de vencimento
    }

    return sortDirection === 'asc' ? comparison : -comparison; // Aplica a direção da ordenação
  });

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
                    <span className={style.notificationText}>
                      {/* Documentos próximos de vencer */}
                    </span>
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
              onClick={() => setSortDirection('asc')}
            >
              <FaSortUp />
            </button>
            <button
              className={style.sortIcons}
              onClick={() => setSortDirection('desc')}
            >
              <FaSortDown />
            </button>
          </div>

          <section>
            {sortedDocuments?.map((document) => (
              <Documents
                document={document}
                key={document._id}
                handleFormSubmit={onSubmitModalForm}
                types={types}
              />
            ))}
          </section>
        </div>
      </div>

      {showExpiringDocuments && (
        <div className={style.expiringDocumentsContainer}>
          <h2>Documentos Próximos de Vencer</h2>
          <ul>
            {documentsExpiringSoon.map((document) => (
              <li key={document._id}>
                <FaArrowRight />
                {document.name} - Vencimento em {formatDate(document.validity)}
              </li>
            ))}
          </ul>
          <button onClick={handleCloseExpiringDocuments}>Fechar</button>
        </div>
      )}

      {error && <h1>Não foi possível carregar os dados</h1>}
      {loading && <Loading />}
      {!loading && !error && (
        <>
          <div>
            {confirmationMessage && deletedDocumentId && (
              <div>{confirmationMessage}</div>
            )}
          </div>
        </>
      )}

      <Footer />
    </section>
  );
};

export default DocumentsPage;
