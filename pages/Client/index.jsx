import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RiHomeHeartLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

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
    // Ordenar os clientes por ordem alfabética
    const sortedClients = [...clients].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <main className={style.ClientHome}>
        <div className={style.container}>
          <div className={style.clientContent}>
            <div className={style.header}>
              <div className={style.headingWrapper}>
                <h1 className={style.title}>Clientes</h1>
                <div className={style.nav}>
                  <div className={style.buttonContainer}>
                    <Link to="/home" className={style.buttons}>
                      <button className={style.homeButton}>
                        <RiHomeHeartLine className={style.home} />
                      </button>
                    </Link>
                    <Link to="/client" className={style.buttons}>
                      <button>
                        <HiUsers />
                      </button>
                    </Link>

                    <section className={style.modals}>
                      {/* Modal de cadastro do Cliente */}
                      <div className={style.modalContent}>
                        <Modal label="Clientes">
                          <ClientForm handleFormSubmit={onSubmitModalForm} />
                        </Modal>
                      </div>

                      <div className={style.modalContent}>
                        <Modal label="Empresas">
                          <CompanyForm
                            handleFormSubmit={onSubmitModalForm}
                            clients={clients}
                          />
                        </Modal>
                      </div>
                    </section>

                    {/* <div className={style.Heading}>
                    <div className={style.find}>
                      <label className={style.search} htmlFor="searchCnpj">
                        <input
                          className={style.searchInput}
                          type="text"
                          placeholder="Buscar por CNPJ..."
                          value={""}
                          onChange={() => console.log("oi")}
                        />
                        <IoMdSearch className={style.searchIcon} />
                      </label>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <section className={style.contentClientList}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <ClientWrapper.Container data={sortedClients} />
              )}
            </section>
          </div>
        </div>

        <Footer />
      </main>
    );
  }
};

export default Client;
