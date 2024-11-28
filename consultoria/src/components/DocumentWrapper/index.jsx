import { useEffect } from "react";
import { HiFolderPlus, HiMiniUserPlus } from "react-icons/hi2";
import { useData } from "@/hooks/useData";
import { DocumentForm } from "@/components/Forms/DocumentForm";
import { Modal } from "@/components/Modal";

import { DocumentContainer } from "@/components/DocumentWrapper/DocumentContainer";
import { TypeForm } from "@/components/Forms/TypeForm";

import style from "@/components/DocumentWrapper/DocumentWrapper.module.css";
import { TypeProvider } from "@/contexts/Type/TypeContext";

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
      <section className={style.documents}>
        <h2 className={style.subtitle}>Documentos:</h2>
        <div className={style.documentsHeader}>
          <Modal.Context>
            <Modal.Open>
              <HiMiniUserPlus />
              Novo Documento
            </Modal.Open>
            <Modal.Body>
              <Modal.Content label="Novo Documento">
                <DocumentForm handleFormSubmit={onSubmitModalForm} />
              </Modal.Content>
            </Modal.Body>
          </Modal.Context>

          <Modal.Context>
            <Modal.Open>
              <HiFolderPlus />
              Castrar tipo de documento
            </Modal.Open>
            <Modal.Body>
              <Modal.Content label="Novo tipo de documento">
                <TypeProvider>
                  <TypeForm />
                </TypeProvider>
              </Modal.Content>
            </Modal.Body>
          </Modal.Context>
        </div>

        {!loading && error && (
          <p className={style.errorNotFound}>Nenhum documento encontrado</p>
        )}

        {!loading && !error && (
          <>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                <div className={style.contentClientList}>
                  {loading ? (
                    <p>Carregando...</p>
                  ) : (
                    <>
                      {documents.map(document => (
                        <div className={style.list} key={document._id}>
                          <DocumentContainer document={document} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};
