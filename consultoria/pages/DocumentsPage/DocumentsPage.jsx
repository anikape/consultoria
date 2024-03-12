import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useData } from "../../src/hooks/useData";
import { Loading } from "../../component/Loading";
import style from "./Documents.module.css";
import { BsFiletypePdf } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RiHomeHeartLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Footer from "../../component/Footer";
import { useFetch } from "../../src/hooks/useFetch";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const DocumentsPage = () => {
  const { error, request } = useData();
  const [newPdf, setNewPdf] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDocument, setEditedDocument] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [deletedDocumentId, setDeletedDocumentId] = useState(null);
  const { deleteData, editData } = useFetch();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    // request("get", "document", { withCredentials: true });
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [companysData, typesData] = await Promise.all([
        request("get", "document", { withCredetials: true }),
        request("get", "types", { withCredetials: true }),
      ]);

      setDocuments(companysData.json);
      setTypes(typesData.json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(types);
  console.log(documents);

  const teste = (id) =>
    types
      ?.filter(({ _id }) => (_id === document.type ? <>{_id}</> : ""))
      .map(({ description }) => description);

  console.log();

  // const handleDeleteDocument = async (documentId) => {
  //   try {
  //     await deleteData(`document/${documentId}`, documentId);
  //     setDeletedDocumentId(documentId);
  //     setConfirmationMessage('Documento excluído com sucesso!');
  //     await request('get', 'document', { withCredentials: true });
  //   } catch (error) {
  //     console.error('Erro ao excluir documento:', error);
  //   }
  // };

  const handleDeleteDocument = async (documentId) => {
    try {
      // Exibe um popup de confirmação
      const userConfirmed = window.confirm("Confirma a exclusão do documento?");

      if (userConfirmed) {
        // Se o usuário confirmar, exclui o documento
        await deleteData(`document/${documentId}`, documentId);
        setDeletedDocumentId(documentId);
        setConfirmationMessage("Documento excluído com sucesso!");
        await request("get", "document", { withCredentials: true });
      } else {
        // Se o usuário cancelar, não faz nada
        console.log("Operação de exclusão cancelada pelo usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
  };

  // const handleEditDocument = async (documentId, newData) => {
  //   try {
  //    const response = await editData(`document/${documentId}`, newData);
  //    if (response.ok) {
  //     const updatedDocuments = documents.map((doc) => {
  //      if (doc._id === documentId) {
  //       return { ...doc, ...newData }; // Atualiza o documento editado
  //      }
  //      return doc;
  //     });
  //     request("get", "document", { withCredentials: true });
  //     setIsEditing(false);
  //     setEditedDocument(null);
  //     setConfirmationMessage("Alterações salvas com sucesso!");
  //    } else {
  //     console.error("Erro ao editar documento:", response.statusText);
  //    }
  //   } catch (error) {
  //    console.error("Erro ao editar documento:", error);
  //   }
  //  };

  const handleEditDocument = async (documentId, newData) => {
    try {
      // Formatando a data para o formato esperado pelo backend
      const formattedDate = format(new Date(newData.date), "yyyy-MM-dd");

      // Criando um novo objeto com a data formatada
      const formattedData = {
        ...newData,
        date: formattedDate,
      };

      const response = await editData(`document/${documentId}`, formattedData);
      if (response.ok) {
        const updatedDocuments = documents.map((doc) => {
          if (doc._id === documentId) {
            return { ...doc, ...newData }; // Atualiza o documento editado
          }
          return doc;
        });
        request("get", "document", { withCredentials: true });
        setIsEditing(false);
        setEditedDocument(null);
        setConfirmationMessage("Alterações salvas com sucesso!");
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
      // Garante que a data de emissão seja uma string no formato 'yyyy-MM-dd'
      const formattedDate = formatDate(new Date(value));
      setEditedDocument((prevDocument) => ({
        ...prevDocument,
        emission: formattedDate,
      }));
    } else if (fieldName === "validity") {
      // Converte a data de vencimento para formato 'YYYY-MM-DD'
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
      // Convertendo a data de emissão de volta para string
      const editedDocumentToSend = {
        ...editedDocument,
        emission: formatDate(editedDocument.emission),
      };

      const response = await editData(
        `document/${editedDocumentToSend._id}`,
        editedDocumentToSend
      );

      if (response.ok) {
        // Atualiza os documentos após salvar as alterações
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
                    <th className={style.infos} colspan="2">
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
                            value={editedDocument.client}
                            onChange={(e) =>
                              handleInputChange("client", e.target.value)
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
                          rel="noopener noreferrer">
                          <BsFiletypePdf className={style.documentsIcons} />
                        </a>

                        {!isEditing && (
                          <button
                            className={style.iconButton}
                            onClick={() => handleEditButtonClick(document)}>
                            <CiEdit className={style.documentsIcons} />
                          </button>
                        )}
                        <button
                          className={style.iconButton}
                          onClick={() => handleDeleteDocument(document._id)}>
                          <MdDeleteOutline className={style.documentsIcons} />
                        </button>
                        {isEditing && editedDocument?._id === document._id && (
                          <button
                            className={style.iconButton}
                            onClick={handleSaveEdit}>
                            <FaSave />
                          </button>
                        )}
                        {isEditing && editedDocument && (
                          <>
                            <button
                              className={style.iconButton}
                              onClick={handleCancelEdit}>
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

      <Footer />
    </div>
  );
};

export default DocumentsPage;
