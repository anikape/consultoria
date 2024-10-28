import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BsBuildingFillAdd } from "react-icons/bs";
import { HiMiniUserPlus, HiUsers } from "react-icons/hi2";
import { RiHomeHeartLine } from "react-icons/ri";

import { useData } from "@hooks/useData";
import { useClient } from "@hooks/useClient";

import { ClientsList } from "@components/ClientsList";
import { ClientForm } from "@components/Forms/ClientForm";
import { CompanyForm } from "@components/Forms/CompanyForm";
import { Loading } from "@components/Loading";
import { Modal } from "@components/Modal";
import { Navigation } from "@components/Navigation";
import Footer from "@components/Footer";
import LoadingSpinner from "@components/LoadingSpinner";

import style from "@pages/Client/client.module.css";

const Client = () => {
  const { loading, error, request } = useData(false);
  const { clients, loadClients } = useClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  const loadData = async () => {
    const response = await request("get", "client", { withCredentials: true });
    const clientsList = response.json;

    await loadClients(clientsList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const findClients = (search) => {
    const result = [];
    return result;
  };

  useEffect(() => {
    if (clients && clients.length > 0) {
      setFilteredClients(
        clients?.filter((client) => {
          const hasName =
            client.name &&
            client.name.toLowerCase().includes(searchTerm.toLowerCase());
          const hasCnpj = client.cnpj && client.cnpj.includes(searchTerm);
          return hasName || hasCnpj;
        })
      );
    }
  }, [clients, searchTerm]);

  useEffect(() => {
    // console.log("Loading:", loading);
    // console.log("Clients:", clients);
    // console.log("Filtered Clients:", filteredClients);
    // console.log("Search Term:", searchTerm);
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
                        <ClientForm />
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
                        <CompanyForm />
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
              {loading && !clients ? (
                <LoadingSpinner />
              ) : (
                <ClientsList.Container clients={sortedClients} />
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
