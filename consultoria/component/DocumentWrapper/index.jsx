import { useEffect } from "react";
import { useData } from "../../src/hooks/useData";
import style from "./DocumentWrapper.module.css";
import { DocumentContainer } from "./DocumentContainer";
import { Loading } from "../Loading";
import { DocumentForm } from "../../component/Forms/DocumentForm";
import { Modal } from "../../component/Modal";

export const DocumentWrapper = ({ data }) => {
  const { ["data"]: documents, loading, error, request } = useData();

  console.log("documents: ", documents);
  console.log("document: ", data);

  const loadData = async () =>
    await request("GET", `/document?company=${data}`, {
      withCrendentials: true,
    });

  const onSubmitModalForm = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [request]);

  return (
    <>
      {!loading && error && (
        <>
          <section className={style.documents}>
            <div className={style.documentsHeader}>
              <h2 className={style.subtitle}>Documentos:</h2>
              <Modal label="Novo Documento">
                <DocumentForm handleFormSubmit={onSubmitModalForm} />
              </Modal>
            </div>
            <p className={style.errorNotFound}>Nenhum documento encontrado</p>
          </section>
        </>
      )}
      {!loading && !error && (
        <>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              <section className={style.documents}>
                <div className={style.documentsHeader}>
                  <h2 className={style.subtitle}>Documentos:</h2>
                  <Modal label="Novo Documento">
                    <DocumentForm handleFormSubmit={onSubmitModalForm} />
                  </Modal>
                </div>

                <div className={style.contentClientList}>
                  {loading ? (
                    <p>Carregando...</p>
                  ) : (
                    <>
                      {documents.map((document) => (
                        <div className={style.list} key={document._id}>
                          <DocumentContainer document={document} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};
