import { useEffect } from "react";
import { Link } from "react-router-dom";

import { RiHomeHeartLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { HiMiniUserPlus } from "react-icons/hi2";

import { useData } from "../../src/hooks/useData";

import { ClientWrapper } from "../../component/ClientWrapper";
import { CompanyForm } from "../../component/Forms/CompanyForm";
import { ClientForm } from "../../component/Forms/ClientForm";
import { Loading } from "../../component/Loading";

import Footer from "../../component/Footer";
import LoadingSpinner from "../../component/LoadingSpinner";

import style from "./client.module.css";
import { Modal } from "../../component/Modal";

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
                      <RiHomeHeartLine className={style.home} />
                    </Link>
                    <Link to="/client" className={style.buttons}>
                      <HiUsers />
                    </Link>

                    <div className={style.modals}>
                      {/* Modal de cadastro do Cliente */}
                      <div className={style.modalContent}>
                        <Modal.Context>
                          <Modal.Button>
                            <HiMiniUserPlus /> Clientes
                          </Modal.Button>
                          <Modal.Body>
                            <Modal.Content label="Cadastrar clientes">
                              <ClientForm
                                handleFormSubmit={onSubmitModalForm}
                              />
                            </Modal.Content>
                          </Modal.Body>
                        </Modal.Context>
                      </div>

                      <div className={style.modalContent}>
                        <Modal.Context>
                          <Modal.Button>
                            <HiMiniUserPlus /> Empresas
                          </Modal.Button>
                          <Modal.Body>
                            <Modal.Content label="Cadastrar empresas">
                              <CompanyForm
                                handleFormSubmit={onSubmitModalForm}
                                clients={clients}
                              />
                            </Modal.Content>
                          </Modal.Body>
                        </Modal.Context>
                      </div>
                    </div>

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
