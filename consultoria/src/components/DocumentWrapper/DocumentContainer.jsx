import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/helpers/formatDate";

import { AiOutlineFilePdf } from "react-icons/ai";

import { useFetch } from "@/hooks/useFetch";
import { useData } from "@/hooks/useData";

import { Popper } from "@/components/Popper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Loading } from "@/components/Loading";

import style from "@/components/DocumentWrapper/DocumentWrapper.module.css";

export const DocumentContainer = ({ document }) => {
  const { ["data"]: types, loading, request } = useData();
  const { deleteData } = useFetch();
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const { response } = await request("get", "types", {
      withCredentials: true,
    });

    try {
      if (response.status !== 200) {
        throw new Error("Não foi possível obter os dados");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteDocument = async (documentId) => {
    const userConfirmed = window.confirm(
      "Deseja realmente apagar o documento? Esta ação não pode ser desfeita."
    );

    if (!userConfirmed) {
      return;
    }

    try {
      await deleteData(`document/${documentId}`, documentId);
      setMessage("Documento excluído com sucesso");
      loadData();

      // Após 30 segundos, limpa a mensagem
      setTimeout(() => {
        setMessage("");
      }, 30000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.center}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {message && <div className={style.successMessage}>{message}</div>}
          <Popper.Body>
            <Popper.Button>
              {types
                .filter(({ _id }) => _id === document.type)
                .map(({ description }) => description).length > 0
                ? types
                    .filter(({ _id }) => _id === document.type)
                    .map(({ description }) => description)
                : ["Tipo não cadastrado"]}
            </Popper.Button>
            <Popper.Content>
              <div className={style.infoEnterpriseWrapper}>
                <div className={style.infoEnterprise}>
                  <p className={style.infoName}>Nome da empresa:</p>
                  <p>{document.companyName}</p>
                </div>
                <div className={style.infoEnterprise}>
                  <p className={style.infoName}>Nome do Arquivo:</p>
                  <p>{document.name}</p>
                </div>
              </div>

              <div className={style.infoEnterpriseWrapper}>
                <div className={style.infoEnterprise}>
                  <p className={style.infoName}>Emissão:</p>
                  <p>{formatDate(document.emission)}</p>
                </div>
                <div className={style.infoEnterprise}>
                  <p className={style.infoName}>Vencimento:</p>
                  <p>{formatDate(document.validity)}</p>
                </div>
              </div>
              <div className={style.buttonsActions}>
                <Link to={document.url} target="_blank" download>
                  <div className={style.button}>
                    <AiOutlineFilePdf />
                    Abrir arquivo
                  </div>
                </Link>
                <button
                  className={style.button}
                  onClick={() => handleDeleteDocument(document._id)}
                >
                  Excluir Documento
                </button>
              </div>
            </Popper.Content>
          </Popper.Body>
        </>
      )}
    </div>
  );
};
