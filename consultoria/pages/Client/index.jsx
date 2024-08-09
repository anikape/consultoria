import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RiHomeHeartLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { HiMiniUserPlus } from "react-icons/hi2";
import { BsBuildingFillAdd } from "react-icons/bs";

import { useData } from "../../src/hooks/useData";

import { Navigation } from "../../component/Navigation";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  const loadData = async () => {
    await request("get", "client", { withCredentials: true });
  };

  const onSubmitModalForm = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [request]);

  useEffect(() => {
    if (clients) {
      setFilteredClients(
        clients.filter(client => {
          const hasName = client.name && client.name.toLowerCase().includes(searchTerm.toLowerCase());
          const hasCnpj = client.cnpj && client.cnpj.includes(searchTerm);
          return hasName || hasCnpj;
        })
      );
    }
  }, [clients, searchTerm]);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Clients:", clients);
    console.log("Filtered Clients:", filteredClients);
    console.log("Search Term:", searchTerm);
  }, [loading, clients, filteredClients, searchTerm]);

  if (loading && !clients) {
    return <Loading />;
  }

  if (clients) {
    const sortedClients = [...filteredClients].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <main className={style.ClientHome}>
        <div className={style.container}>
          <div className={style.clientContent}>
            <div className={style.header}>
              <div className={style.headingWrapper}>
                <h1 className={style.title}>Clientes</h1>
                <Navigation>
                  <Link to="/home" className={style.buttons}>
                    <RiHomeHeartLine className={style.home} />
                  </Link>
                  <Link to="/client" className={style.buttons}>
                    <HiUsers />
                  </Link>

                  <Modal.Context>
                    <Modal.Button>
                      <HiMiniUserPlus />
                      <p className={style.labelModalButton}>Clientes</p>
                    </Modal.Button>
                    <Modal.Body>
                      <Modal.Content label="Cadastrar clientes">
                        <ClientForm handleFormSubmit={onSubmitModalForm} />
                      </Modal.Content>
                    </Modal.Body>
                  </Modal.Context>

                  <Modal.Context>
                    <Modal.Button>
                      <BsBuildingFillAdd />
                      <p className={style.labelModalButton}>Empresas</p>
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
                </Navigation>
              </div>
              {/* <div className={style.Heading}>
                <div className={style.find}>
                  <label className={style.search} htmlFor="searchCnpj">
                    <input
                      className={style.searchInput}
                      type="text"
                      placeholder="Digite o nome..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoMdSearch className={style.searchIcon} />
                  </label>
                </div>
              </div> */}
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

  return null;
};

export default Client;
