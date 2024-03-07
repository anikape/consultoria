import { useEffect } from "react";
import { useData } from "../../src/hooks/useData";
import style from "./DocumentWrapper.module.css";
import { DocumentContainer } from "./DocumentContainer";
import { Loading } from "../Loading";

export const DocumentWrapper = ({ data }) => {
  const { ["data"]: documents, loading, error, request } = useData();

  useEffect(() => {
    const loadData = async () =>
      await request("GET", `/document?company=${data}`, {
        withCrendentials: true,
      });
  }, [request]);

  return (
    <>
      {!loading && error && <p>Nenhum documento encontrado</p>}
      {!loading && !error && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <section className={style.contentClientList}>
                {loading ? (
                  <Loading />
                ) : (
                  // <ClientWrapper.Container data={clients} />
                  <>
                    {documents.map((document) => (
                      <div className={style.list} key={document._id}>
                        <DocumentContainer document={document} />
                      </div>
                    ))}
                  </>
                )}
              </section>
              {/* {documents.map((document) => (
                <DocumentContainer document={document} key={document._id} />
              ))} */}
            </>
          )}
        </>
      )}
    </>
  );
};
