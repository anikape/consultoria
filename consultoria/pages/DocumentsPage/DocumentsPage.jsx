import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../src/hooks/useData';
import { Loading } from '../../component/Loading';
import style from './Documents.module.css';
import pdf from '../../src/assets/pdf.png';
import edity from '../../src/assets/edity.png';
import excluir from '../../src/assets/delittt.png';
import { AiFillSetting } from 'react-icons/ai';
import { RiHomeHeartLine } from 'react-icons/ri';
import Footer from '../../component/Footer';
import { useFetch } from '../../src/hooks/useFetch';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const DocumentsPage = () => {
  const { ['data']: documents, loading, error, request } = useData();
  const [newPdf, setNewPdf] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDocument, setEditedDocument] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [deletedDocumentId, setDeletedDocumentId] = useState(null);
  const { deleteData, editData } = useFetch();

  useEffect(() => {
    request('get', 'document', { withCredentials: true });
  }, [request]);

  const handleDeleteDocument = async (documentId) => {
    try {
      await deleteData(`document/${documentId}`, documentId);
      setDeletedDocumentId(documentId);
      setConfirmationMessage('Documento excluído com sucesso!');
      await request('get', 'document', { withCredentials: true });
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };

  const handleEditDocument = async (documentId, newData) => {
    try {
      await editData(documentId, newData);
      await request('get', 'document', { withCredentials: true });
      setIsEditing(false);
      setEditedDocument(null);
    } catch (error) {
      console.error('Erro ao editar documento:', error);
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
    if (fieldName === 'emission') {
      const formattedDate = formatDate(new Date(value));
      setEditedDocument((prevDocument) => ({
        ...prevDocument,
        emission: formattedDate,
      }));
    } else if (fieldName === 'validity') {
      const date = new Date(value);
      const validity = `${date.getFullYear()}-${(
        '0' +
        (date.getMonth() + 1)
      ).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
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
        editedDocumentToSend,
      );

      if (response.ok) {
        const updatedDocuments = documents.map((doc) => {
          if (doc._id === editedDocumentToSend._id) {
            return editedDocumentToSend;
          }
          return doc;
        });

        setDocuments(updatedDocuments); // Atualiza o estado documents com os documentos atualizados

        setIsEditing(false);
        setEditedDocument(null);
        setConfirmationMessage('Alterações salvas com sucesso!');
      } else {
        console.error('Erro ao salvar as alterações:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
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

          <div>
            {confirmationMessage && deletedDocumentId && (
              <div>{confirmationMessage}</div>
            )}
          </div>

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
                {documents.map((document, index) => (
                  <tr key={document._id}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing && editedDocument?._id === document._id ? (
                        <input
                          type="text"
                          value={editedDocument.name}
                          onChange={(e) =>
                            handleInputChange('name', e.target.value)
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
                            handleInputChange('type', e.target.value)
                          }
                        />
                      ) : (
                        document.type
                      )}
                    </td>
                    <td>
                      {isEditing && editedDocument?._id === document._id ? (
                        <input
                          type="text"
                          value={editedDocument.client}
                          onChange={(e) =>
                            handleInputChange('client', e.target.value)
                          }
                        />
                      ) : (
                        document.client
                      )}
                    </td>
                    <td>
                      {isEditing && editedDocument?._id === document._id ? (
                        <input
                          type="text"
                          value={editedDocument.emission}
                          onChange={(e) =>
                            handleInputChange('emission', e.target.value)
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
                            handleInputChange('validity', e.target.value)
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
                        <img
                          className={style.documentsIcons}
                          src={pdf}
                          alt=""
                        />
                      </a>
                      {!isEditing && (
                        <button
                          className={style.iconButton}
                          onClick={() => handleEditButtonClick(document)}
                        >
                          <img
                            className={style.documentsIcons}
                            src={edity}
                            alt=""
                          />
                        </button>
                      )}
                      <button
                        className={style.iconButton}
                        onClick={() => handleDeleteDocument(document._id)}
                      >
                        <img
                          className={style.documentsIcons}
                          src={excluir}
                          alt=""
                        />
                      </button>
                      {isEditing && editedDocument?._id === document._id && (
                        <button
                          className={style.iconButton}
                          onClick={handleSaveEdit}
                        >
                          Salvar
                        </button>
                      )}
                      {isEditing && editedDocument && (
                        <>
                          <button
                            className={style.iconButton}
                            onClick={handleCancelEdit}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default DocumentsPage;
