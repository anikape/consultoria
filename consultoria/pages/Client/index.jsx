import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Profile from "../Profile";
import EntrepriseProfile from "../EnterpriseProfile";
import mais from "../../src/assets/mais.png";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle, FaHome } from "react-icons/fa";
import DocumentPage from "../DocumentsPage/DocumentsPage";

import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import { useData } from "../../src/hooks/useData";

import { ClientWrapper } from "../../component/ClientWrapper";
import { CompanyWrapper } from "../../component/CompanyWrapper";
import { CompanyForm } from "../../component/Forms/CompanyForm";
import { Loading } from "../../component/Loading";
import { Modal } from "../../component/Modal";
import Footer from "../../component/Footer";

import style from "./client.module.css";

const Client = () => {
  const auth = useContext(AuthContext);
  // const methods = useForm();

  const [openModal, setOpenModal] = useState(false);

  const [clients, loading, error] = useData({
    method: "GET",
    url: "client",
    withCredentials: true,
  });

  // console.log(documents);

  // console.log("Renderizou Auth:", auth?.user.id);

  if (clients === null) {
    return null;
  }

  const [selectedClient, setSelectedClient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  // const [expandedClients, setExpandedClients] = useState(
  //   clients?.reduce((acc, client) => {
  //     acc[client.id] = true;
  //     return acc;
  //   }, {})
  // );
  // const [expandedEnterpriseIndex, setExpandedEnterpriseIndex] = useState(-1);
  const [searchCnpj, setSearchCnpj] = useState("");

  // Define o elemento do aplicativo para evitar o erro

  // const handleEnterpriseAccordionClick = (index) => {
  //   setExpandedEnterpriseIndex(index === expandedEnterpriseIndex ? -1 : index);
  // };

  //**Funções de Busca */

  // const handleSearch = (event) => {
  //   const newSearchTerm = event.target.value;
  //   setSearchTerm(newSearchTerm);
  //   setExpandedClients({}); // Reset all client accordions on search

  //   // Filter and expand clients that match the search term
  //   const newExpandedClients = {};
  //   clients?.forEach((client) => {
  //     if (
  //       client.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
  //       client.entreprise.some((enterprise) =>
  //         enterprise.razaoSocial
  //           .toLowerCase()
  //           .includes(newSearchTerm.toLowerCase())
  //       )
  //     ) {
  //       newExpandedClients[client.id] = true;
  //     }
  //   });
  //   setExpandedClients(newExpandedClients); // Update the expanded state
  // };

  // const handleSearchCnpj = (event) => {
  //   setSearchCnpj(event.target.value);
  //   setExpandedClients({}); // Reset all client accordions on CNPJ search
  //   setExpandedEnterpriseIndex(-1); // Reset expanded enterprise accordion on CNPJ search

  //   // Filter and expand clients that match the CNPJ search
  //   const newExpandedClients = {};
  //   clients?.forEach((client) => {
  //     if (
  //       client.entreprise.some((enterprise) =>
  //         enterprise.cpfCnpj.toString().includes(searchCnpj)
  //       )
  //     ) {
  //       newExpandedClients[client.id] = true;
  //     }
  //   });
  //   setExpandedClients(newExpandedClients); // Update the expanded state
  // };

  // const filteredClientsByCnpj = clients?.filter(
  //   (client) =>
  //     client.entreprise.some((enterprise) =>
  //       enterprise.cpfCnpj.toString().includes(searchCnpj)
  //     ) && expandedClients[client.id]
  // );

  // const filteredClients = clients?.filter((client) => {
  //   const isClientExpanded = expandedClients[client.id];
  //   const isClientNameMatch = client.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());

  //   // Only include the client in the filtered list if it matches the search term and is expanded
  //   return isClientExpanded && isClientNameMatch;
  // });

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
                value={searchCnpj}
                onChange={() => console.log("oi")}
                // onChange={handleSearchCnpj}
              />
            </div>

            {/*Modal de cadastro*/}
            <div className={style.modalContent}>
              <button
                className={style.buttonModal}
                onClick={() => setOpenModal(!openModal)}>
                <img src={mais} alt="simbolo de mais" />
                Novo Cadastro
              </button>

              <Modal Modal isOpen={openModal} setIsOpen={setOpenModal}>
                <CompanyForm />
              </Modal>
            </div>
          </div>
        </div>

        <section className={style.contentClientList}>
          {loading ? (
            <Loading />
          ) : (
            <ClientWrapper.Container>
              {clients.map((client) => (
                <ClientWrapper.Content key={client._id}>
                  <ClientWrapper.Button client={client} key={client.id} />
                  <ClientWrapper.Company>
                    <CompanyWrapper.Company client={client} />
                  </ClientWrapper.Company>
                </ClientWrapper.Content>
              ))}
            </ClientWrapper.Container>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Client;
