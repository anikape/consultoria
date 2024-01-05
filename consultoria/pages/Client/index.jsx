import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./client.module.css";
import Modal from "react-modal";

import Profile from "../Profile";
import EntrepriseProfile from "../EnterpriseProfile";
import mais from "../../src/assets/mais.png";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle, FaHome } from "react-icons/fa";
import DocumentPage from "../DocumentsPage/DocumentsPage";
import { Loading } from "../../component/Loading";
import { useData } from "../../src/hooks/useData";
import { ClientBox } from "../../component/ClientBox";
import { ClientContainer } from "../../component/ClientContainer";
import { ClientContent } from "../../component/ClientContent";
import { CompanyProfile } from "../../component/CompanyProfile";
import { ClientCompanyContent } from "../../component/ClientCompanyContent";
import { AuthContext } from "../../src/contexts/Auth/AuthContext";
import Footer from "../../component/Footer";

const Client = () => {
  const auth = useContext(AuthContext);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCnpj, setClientCNPJ] = useState("");
  const [clientRazaoSocial, setClientRazaoSocial] = useState("");
  const [clientRua, setClienteRua] = useState("");
  const [clientNumero, setClientNumero] = useState("");
  const [clientBairro, setClienteBairro] = useState("");
  const [clientComplemento, setClientComplemento] = useState("");
  const [clientCep, setClientcep] = useState("");
  const [clientUf, setClientUf] = useState("");

  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const [clients, loading, error] = useData({
    method: "GET",
    url: "client",
  });

  console.log(clients);

  console.log("Auth:", auth?.user.id);

  if (clients === null) {
    return null;
  }

  const openModal2 = () => {
    setModal2IsOpen(true);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
  };

  const handleSubmit = (event) => {
    // Lógica para enviar os dados para o backend (chamada à API)
    event.preventDefault();
    // Aqui você pode enviar os dados para o backend usando fetch, axios, etc.
    // Após o sucesso, exiba a mensagem de sucesso e feche o modal
    // Você pode controlar isso usando o estado do React.
    //  setSuccessMessage('Cadastro realizado com sucesso');
    // E depois de alguns segundos, resetar a mensagem e fechar o modal
    // setSuccessMessage('');
    // setModalIsOpen(false);

    const data = {
      companyName: "Cavalo Marinho Ltda",
      email: "cavalo@teste.com",
      cnpj: "01234567890000",
      cnae: "123456",
      address: "Rua West Blue, 57",
      city: "All Blue",
      state: "PE",
      clientId: auth.user.id,
      mainActivity: "Restaurante",
      phone: "33134141",
    };

    //  id: string;
    // companyName: string;
    // email?: string;
    // cnpj: string;
    // cnae: number;
    // secondaryCnae?: Array<Number> | null;
    // mainActivity: string | null;
    // phone?: string;
    // cellphone?: string;
    // zipcode?: string;
    // address: string;
    // city: string;
    // state: string;
    // comments?: string;

    console.log(data);
  };

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
                // onChange={handleSearchCnpj}
              />
            </div>

            {/*Modal de cadastro*/}
            <div className={style.modalContent}>
              <button className={style.buttonModal} onClick={openModal2}>
                <img src={mais} alt="simbolo de mais" />
                Novo Cadastro
              </button>
              <Modal
                isOpen={modal2IsOpen}
                onRequestClose={closeModal2}
                contentLabel="Modal cadastro de cliente"
                className={style.modalContainer}>
                <h3 className={style.h3}> Cliente</h3>

                <form onSubmit={handleSubmit}>
                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="name">
                      Nome:
                    </label>
                    <input
                      type="name"
                      name="Nome"
                      value={clientName}
                      placeholder="Infome o nome"
                      required
                      className={style.input}
                      id="name"
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="email">
                      E-mail:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={clientEmail}
                      placeholder="Infome E-mail"
                      required
                      className={style.input}
                      id="email"
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="name">
                      Razão Social:
                    </label>
                    <input
                      type="name"
                      name="Razão Social"
                      value={clientRazaoSocial}
                      placeholder="Infome E-mail"
                      required
                      className={style.input}
                      id=""
                      onChange={(e) => setClientRazaoSocial(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="name">
                      CNPJ:
                    </label>
                    <input
                      type="name"
                      name="CNPJ"
                      value={clientCnpj}
                      placeholder="Infome o CNPJ"
                      required
                      className={style.input}
                      id=""
                      onChange={(e) => setClientCNPJ(e.target.value)}
                    />
                  </div>
                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="street">
                      Rua/Logradouro:
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={clientRua}
                      placeholder="Informe a rua/logradouro"
                      required
                      className={style.input}
                      id="street"
                      onChange={(e) => setClienteRua(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="number">
                      Número:
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={clientNumero}
                      placeholder="Informe o número"
                      required
                      className={style.input}
                      id="number"
                      onChange={(e) => setClientNumero(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="neighborhood">
                      Bairro:
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={clientBairro}
                      placeholder="Informe o bairro"
                      required
                      className={style.input}
                      id="neighborhood"
                      onChange={(e) => setClienteBairro(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="complement">
                      Complemento:
                    </label>
                    <input
                      type="text"
                      name="complement"
                      value={clientComplemento}
                      placeholder="Informe o complemento"
                      className={style.input}
                      id="complement"
                      onChange={(e) => setClientComplemento(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="cep">
                      CEP:
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={clientCep}
                      placeholder="Informe o CEP"
                      required
                      className={style.input}
                      id="cep"
                      onChange={(e) => setClientcep(e.target.value)}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <label className={style.label} htmlFor="state">
                      UF:
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={clientUf}
                      placeholder="Informe a UF"
                      required
                      className={style.input}
                      id="state"
                      onChange={(e) => setClientUf(e.target.value)}
                    />
                  </div>
                  <div className={style.buttons}>
                    <button className={style.button1} type="submit">
                      Salvar
                    </button>
                    <button className={style.button2} onClick={closeModal2}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>

        <section className={style.contentClientList}>
          {loading ? (
            <Loading />
          ) : (
            <ClientContainer>
              {clients.map((client) => (
                <ClientContent key={client._id}>
                  <ClientBox client={client} key={client.id} />
                  <ClientCompanyContent>
                    <CompanyProfile client={client} />
                  </ClientCompanyContent>
                </ClientContent>
              ))}
            </ClientContainer>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Client;
