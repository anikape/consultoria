import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EntrepriseProfile from "../EnterpriseProfile";
import { FaHome } from "react-icons/fa";
import DocumentPage from "../DocumentsPage/DocumentsPage";
import { useData } from "../../src/hooks/useData";
import { ClientWrapper } from "../../component/ClientWrapper";
import { CompanyForm } from "../../component/Forms/CompanyForm";
import { ClientForm } from "../../component/Forms/ClientForm";
import { Loading } from "../../component/Loading";
import { Modal } from "../../component/Modal";
import Footer from "../../component/Footer";

import style from "./client.module.css";

const Client = () => {
  // const [openModalCompany, setOpenModalCompany] = useState(false);
  // const [openModalClient, setOpenModalClient] = useState(false);

  const { ["data"]: clients, loading, error, request } = useData();

  useEffect(() => {
    request("get", "client", { withCredentials: true });
  }, [request]);

  if (loading) {
    return <Loading />;
  }

  if (clients) {
    return (
      <main className={style.mainHome}>
        <div className={style.container}>
          <div className={style.header}>
            <div className={style.headingWrapper}>
              <Link className={style.buttonHome} to="/home">
                <FaHome className={style.home} />
              </Link>
              <h1 className={style.title}>Clientes</h1>
            </div>

            <div className={style.Heading}>
              <div className={style.find}>
                <label className={style.search} htmlFor="searchCnpj">
                  CNPJ:
                </label>
                <input
                  className={style.searchInput}
                  type="text"
                  placeholder="Buscar por CNPJ..."
                  value={""}
                  onChange={() => console.log("oi")}
                />
              </div>

              <section className={style.modals}>
                {/*Modal de cadastro do Cliente*/}
                <div className={style.modalContent}>
                  <Modal label="Cadastrar clientes">
                    <ClientForm />
                  </Modal>
                </div>

                <div className={style.modalContent}>
                  <Modal label="Cadastrar empresas">
                    <CompanyForm clients={clients} />
                  </Modal>
                </div>
              </section>
            </div>
          </div>

          <section className={style.contentClientList}>
            {loading ? <Loading /> : <ClientWrapper.Container data={clients} />}
          </section>
        </div>
        <Footer />
      </main>
    );
  }
};

export default Client;
