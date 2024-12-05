import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BsBuildingFillAdd } from "react-icons/bs";
import { HiMiniUserPlus, HiUsers } from "react-icons/hi2";
import { RiHomeHeartLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

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
  const { loading, request } = useData(false);
  const { clientList, loadClients } = useClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isAscending, setIsAscending] = useState(true); // Controle da ordenação

  const loadData = async () => {
    const response = await request("get", "client", { withCredentials: true });
    const clients = response.json;
    await loadClients(clients);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (clientList?.length > 0) {
      setFilteredClients(
        clientList.filter(client => {
          const nameMatch = client.name?.toLowerCase().includes(searchTerm.toLowerCase());
          const cnpjMatch = client.cnpj?.includes(searchTerm);
          return nameMatch || cnpjMatch;
        })
      );
    }
  }, [clientList, searchTerm]);

  const handleSortToggle = () => {
    setIsAscending(prev => !prev);
  };

  if (loading && !clientList) {
    return <Loading />;
  }

  if (clientList) {
    const sortedClients = [...filteredClients].sort((a, b) => {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

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
                    <Modal.Open>
                      <HiMiniUserPlus />
                      <p className={style.labelModalButton}>Clientes</p>
                    </Modal.Open>
                    <Modal.Body>
                      <Modal.Content label="Cadastrar clientes">
                        <ClientForm />
                      </Modal.Content>
                    </Modal.Body>
                  </Modal.Context>

                  <Modal.Context>
                    <Modal.Open>
                      <BsBuildingFillAdd />
                      <p className={style.labelModalButton}>Empresas</p>
                    </Modal.Open>
                    <Modal.Body>
                      <Modal.Content label="Cadastrar empresas">
                        <CompanyForm />
                      </Modal.Content>
                    </Modal.Body>
                  </Modal.Context>
                </Navigation>
              </div>
              <div className={style.find}>
                <label className={style.search} htmlFor="search">
                  <input
                    id="search"
                    className={style.searchInput}
                    type="text"
                    placeholder="Digite o nome."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <IoMdSearch className={style.searchIcon} />
                </label>
                <button
                  className={style.sortButton}
                  onClick={handleSortToggle}
                  aria-label="Ordenar de A-Z"
                >
                  {isAscending ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                </button>
              </div>
            </div>
            <section className={style.contentClientList}>
              {loading ? (
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
