import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useData } from "../../src/hooks/useData";
import Modal from "react-modal"; //linha nova
import { Loading } from "../../component/Loading";
import style from "./Documents.module.css";
import { BsFiletypePdf } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RiHomeHeartLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Footer from "../../component/Footer";
import { useFetch } from "../../src/hooks/useFetch";

Modal.setAppElement("#root");

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const DocumentsPage = () => {
  const { error, request } = useData();
  const { deleteData, editData } = useFetch();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsExpiringSoon, setDocumentsExpiringSoon] = useState([]);
  const soonThreshold = 7; // Limite de dias para considerar como "próximo de vencer"
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deletedDocumentId, setDeletedDocumentId] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [showExpiringDocuments, setShowExpiringDocuments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [deletedDocumentId]); // Atualiza quando deletedDocumentId muda

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage(""); // Limpa a mensagem após 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [confirmationMessage]);

  useEffect(() => {
    if (documentsExpiringSoon.length > 0) {
      setShowNotification(true);
    }
  }, [documentsExpiringSoon]); // Atualiza quando documentsExpiringSoon muda

  const loadData = async () => {
    setLoading(true);
    try {
      const [companysData, typesData] = await Promise.all([
        request("get", "document", { withCredentials: true }),
        request("get", "types", { withCredentials: true }),
      ]);

      setDocuments(companysData.json);
      setTypes(typesData.json);

      // Calcular documentos próximos de vencer
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

  const handleNotificationButtonClick = () => {
    setShowExpiringDocuments(true);
  };

  const handleCloseExpiringDocuments = () => {
    setShowExpiringDocuments(false);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  {
    /*Função para deletar documentos */
  }
  // const handleDeleteDocument = async (documentId) => {
  //   try {
  //     const userConfirmed = window.confirm('Confirma a exclusão do documento?');
  //     if (userConfirmed) {
  //       await deleteData(`document/${documentId}`, documentId);
  //       setDeletedDocumentId(documentId); // Atualiza deletedDocumentId
  //       setConfirmationMessage('Documento excluído com sucesso!');
  //     } else {
  //       console.log('Operação de exclusão cancelada pelo usuário.');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao excluir documento:', error);
  //   }
  // };

  const handleDeleteDocument = async (documentId) => {
    try {
      // Ao invés de usar window.confirm, definimos isModalOpen como true
      setIsModalOpen(true);
      // Salvamos o id do documento que será excluído
      setDeletedDocumentId(documentId);
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Chama a função de exclusão de dados
      await deleteData(`document/${deletedDocumentId}`, deletedDocumentId);
      // Atualiza a mensagem de confirmação
      setConfirmationMessage("Documento excluído com sucesso!");
      // Atualiza a lista de documentos após a exclusão
      setDocuments(
        documents.filter((document) => document._id !== deletedDocumentId)
      );
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    } finally {
      // Fecha o modal após a exclusão
      setIsModalOpen(false);
    }
  };

  const handleEditDocument = async (documentId, newData) => {
    try {
      const formattedDate = format(new Date(newData.date), "yyyy-MM-dd");
      const formattedData = { ...newData, date: formattedDate };
      const response = await editData(`document/${documentId}`, formattedData);
      if (response.ok) {
        await request("get", "document", { withCredentials: true });
      } else {
        console.error("Erro ao editar documento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao editar documento:", error);
    }
  };

  const handleEditButtonClick = (document) => {
    setIsEditing(true);
    setEditedDocument({ ...document });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDocument(null);
  };

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "emission") {
      const formattedDate = formatDate(new Date(value));
      setEditedDocument((prevDocument) => ({
        ...prevDocument,
        emission: formattedDate,
      }));
    } else if (fieldName === "validity") {
      const date = new Date(value);
      const validity = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
      setEditedDocument((prevDocument) => ({
        ...prevDocument,
        validity,
      }));
    } else {
      setEditedDocument((prevDocument) => ({
        ...prevDocument,
        [fieldName]: value,
      }));
    }
  };

  const handleSaveEdit = async () => {
    if (!editedDocument) return;

    try {
      const editedDocumentToSend = {
        ...editedDocument,
        emission: formatDate(editedDocument.emission),
      };

      const response = await editData(
        `document/${editedDocumentToSend._id}`,
        editedDocumentToSend
      );

      if (response.ok) {
        await request("get", "document", { withCredentials: true });
        setIsEditing(false);
        setEditedDocument(null);
        setConfirmationMessage("Alterações salvas com sucesso!");
      } else {
        console.error("Erro ao salvar as alterações:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  return (
    <div className={style.documentContainer}>
      {/* Botão de notificação */}
      {showNotification && (
        <div className={style.notificationContainer}>
          <span className={style.notificationText}></span>
          <button
            onClick={handleNotificationButtonClick}
            className={style.showExpiringButton}
          >
            <IoIosNotificationsOutline className={style.notification} />
          </button>
        </div>
      )}

      {/* Lista de documentos próximos de vencer */}
      {showExpiringDocuments && (
        <div className={style.expiringDocumentsContainer}>
          <h2>Documentos Próximos de Vencer</h2>
          <ul>
            {documentsExpiringSoon.map((document) => (
              <li key={document._id}>
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
          <Link className={style.homeButton} to="/home">
            <button>
              <RiHomeHeartLine className={style.home} />
            </button>
          </Link>

          <nav className={style.nav}></nav>

          <div>
            {confirmationMessage && deletedDocumentId && (
              <div>{confirmationMessage}</div>
            )}
          </div>

          <section className={style.tableContent}>
            <div className={style.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th className={style.infos} colSpan="2">
                      Documento
                    </th>
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
                  {documents.map((document, index) => (
                    <tr key={document._id}>
                      <td>{index + 1}</td>
                      <td>
                        {isEditing && editedDocument?._id === document._id ? (
                          <input
                            type="text"
                            value={editedDocument.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                          />
                        ) : (
                          document.name
                        )}
                      </td>
                      <td>
                        {isEditing && editedDocument?._id === document._id ? (
                          <input
                            type="text"
                            value={editedDocument.type}
                            onChange={(e) =>
                              handleInputChange("type", e.target.value)
                            }
                          />
                        ) : // types
                        //   ?.filter(({ _id }) => _id === document.type)
                        //   .map(({ description }) => description)

                        types
                            .filter(({ _id }) => _id === document.type)
                            .map(({ description }) => description).length >
                          0 ? (
                          types
                            .filter(({ _id }) => _id === document.type)
                            .map(({ description }) => description)
                        ) : (
                          ["Tipo não cadastrado"]
                        )}
                      </td>
                      <td>
                        {isEditing && editedDocument?._id === document._id ? (
                          <input
                            type="text"
                            value={editedDocument.companyName}
                            onChange={(e) =>
                              handleInputChange("companyName", e.target.value)
                            }
                          />
                        ) : (
                          document.companyName
                        )}
                      </td>
                      <td>
                        {isEditing && editedDocument?._id === document._id ? (
                          <input
                            type="text"
                            value={editedDocument.emission}
                            onChange={(e) =>
                              handleInputChange("emission", e.target.value)
                            }
                          />
                        ) : (
                          formatDate(document.emission)
                        )}
                      </td>
                      <td>
                        {isEditing && editedDocument?._id === document._id ? (
                          <input
                            type="date"
                            value={formatDate(editedDocument.validity)}
                            onChange={(e) =>
                              handleInputChange("validity", e.target.value)
                            }
                          />
                        ) : (
                          formatDate(document.validity)
                        )}
                      </td>
                      <td>
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsFiletypePdf className={style.documentsIcons} />
                        </a>

                        {!isEditing && (
                          <button
                            disabled
                            className={style.iconButton}
                            onClick={() => handleEditButtonClick(document)}
                          >
                            <CiEdit className={style.documentsIcons} />
                          </button>
                        )}
                        <button
                          className={style.iconButton}
                          onClick={() => handleDeleteDocument(document._id)}
                        >
                          <MdDeleteOutline className={style.documentsIcons} />
                        </button>
                        {isEditing && editedDocument?._id === document._id && (
                          <button
                            className={style.iconButton}
                            onClick={handleSaveEdit}
                          >
                            <FaSave />
                          </button>
                        )}
                        {isEditing && editedDocument && (
                          <>
                            <button
                              className={style.iconButton}
                              onClick={handleCancelEdit}
                            >
                              <MdCancel />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/*Modal de confirmação de exclusão de documentos*/}
      <Modal
        className={style.modal} // Aplica os estilos ao modal
        overlayClassName={style.overlay} // Aplica os estilos ao overlay
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Excluir Documento"
      >
        <h2>Excluir Documento</h2>
        <p>Confirma a exclusão do documento?</p>
        <button
          className={`${style.button} ${style.cancel}`}
          onClick={() => setIsModalOpen(false)}
        >
          Cancelar
        </button>
        <button
          className={`${style.button} ${style.confirm}`}
          onClick={handleDeleteConfirmed}
        >
          Confirmar
        </button>
      </Modal>

      <Footer />
    </div>
  );
};

export default DocumentsPage;
