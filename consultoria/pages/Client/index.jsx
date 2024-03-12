import { useEffect } from "react";
import { Link } from "react-router-dom";

import { RiHomeHeartLine } from "react-icons/ri";

import { useData } from "../../src/hooks/useData";

import { ClientWrapper } from "../../component/ClientWrapper";
import { CompanyForm } from "../../component/Forms/CompanyForm";
import { ClientForm } from "../../component/Forms/ClientForm";
import { Loading } from "../../component/Loading";
import { Modal } from "../../component/Modal";
import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";

import style from "./client.module.css";

const Client = () => {
  const { ["data"]: clients, loading, error, request } = useData(false);

  const loadData = async () =>
    await request("get", "client", { withCredentials: true });

  const onSubmitModalForm = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [request]);

  if (loading && !clients) {
    return <Loading />;
  }

  if (clients) {
    return (
      <main className={style.mainHome}>
        <div className={style.container}>
          <div className={style.header}>
            <div className={style.headingWrapper}>
              <Link className={style.buttonHome} to="/home">
                <RiHomeHeartLine className={style.home} />
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
                    <ClientForm handleFormSubmit={onSubmitModalForm} />
                  </Modal>
                </div>

                <div className={style.modalContent}>
                  <Modal label="Cadastrar empresas">
                    <CompanyForm
                      handleFormSubmit={onSubmitModalForm}
                      clients={clients}
                    />
                  </Modal>
                </div>
              </section>
            </div>
          </div>

          <section className={style.contentClientList}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ClientWrapper.Container data={clients} />
            )}
          </section>
        </div>

        <div className={style.footer}>
          <Footer />
        </div>
      </main>
    );
  }
};

export default Client;
