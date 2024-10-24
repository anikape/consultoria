import { useEffect } from "react";
import { useData } from "@/hooks/useData";
import style from "@/components/DocumentWrapper/DocumentWrapper.module.css";
import { DocumentContainer } from "@/components/DocumentWrapper/DocumentContainer";
import { Loading } from "@/components/Loading";
import { DocumentForm } from "@/components/Forms/DocumentForm";
import { Modal } from "@/components/Modal";
import { HiMiniUserPlus } from "react-icons/hi2";

export const DocumentWrapper = ({ data }) => {
  const { ["data"]: documents, loading, error, request } = useData();

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

              <Modal.Context>
                <Modal.Button>
                  <HiMiniUserPlus />
                  Novo Documento
                </Modal.Button>
                <Modal.Body>
                  <Modal.Content label="Novo Documento">
                    <DocumentForm handleFormSubmit={onSubmitModalForm} />
                  </Modal.Content>
                </Modal.Body>
              </Modal.Context>
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
                  <Modal.Context>
                    <Modal.Button>
                      <HiMiniUserPlus />
                      Novo Documento
                    </Modal.Button>
                    <Modal.Body>
                      <Modal.Content label="Novo Documento">
                        <DocumentForm handleFormSubmit={onSubmitModalForm} />
                      </Modal.Content>
                    </Modal.Body>
                  </Modal.Context>
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
