import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../component/Footer";
import style from "./enterprise.module.css";
import { useData } from "../../src/hooks/useData";
import { DocumentWrapper } from "../../component/DocumentWrapper";

import { RiHomeHeartLine } from "react-icons/ri";
import home from "../../src/assets/home.png";
import { FaUserGroup } from "react-icons/fa6";
import axios from "axios";

const EntrepriseProfile = () => {
  const { id } = useParams();

  //Modal de cadastro de documentos

  // Estado para armazenar a lista de empresas

  useEffect(() => {
    // Faça uma solicitação para obter a lista de empresas do backend
    axios
      .get("company")
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar empresas:", error);
      });
  }, []);

  const { ["data"]: company, loading, error, request } = useData();

  useEffect(() => {
    request("GET", `company/${id}`, { withCredentials: true });
  }, []);
  console.log(company);

  const [editable, setEditable] = useState(false); // Estado para controlar se os campos estão editáveis
  const [companyData, setCompanyData] = useState(company); // Estado para armazenar os dados editáveis

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setEditable(true);
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      // Faça uma solicitação para salvar os dados editados
      await axios.put(`/api/company/${id}`, companyData);
      setEditable(false); // Desativa o modo de edição após salvar
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  // Função para atualizar o estado com os novos valores dos campos editáveis

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Cria uma cópia dos dados da empresa
    const updatedCompanyData = { ...companyData };
    // Atualiza apenas o campo modificado
    updatedCompanyData[name] = value;
    // Atualiza o estado com os novos dados da empresa
    setCompanyData(updatedCompanyData);
  };

  return (
    <main className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.button}>
          <Link to="/client" className={style.buttons}>
            <button>
              {" "}
              <FaUserGroup />
            </button>
          </Link>

          <Link to="/home" className={style.buttons}>
            <button className={style.homeButton}>
              {/* <img src={home} className={style.home} alt="" /> */}
              <RiHomeHeartLine className={style.home} />
            </button>
          </Link>
        </div>

        {!company && error && (
          <>
            <div className={style.errorContainer}>
              <h1>Empresa não encontrada</h1>
              {error && "Não foi possível carregar os dados"}
            </div>
          </>
        )}

        {company && !error && !loading && (
          <>
            <h1 className={style.title1}>{company.companyName}</h1>

            <section className={style.profile}>
              <div className={style.profileItem}>
                <h2>CPF/CNPJ</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="cnpj"
                      value={companyData.cnpj}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.cnpj
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>CNAE</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="cnae"
                      value={companyData.cnae}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.cnae
                  )}
                </span>
              </div>   

              <div className={style.profileItem}>
                <h2>E-mail</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="email"
                      value={companyData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.email
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Telefone Celular</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="cellphone"
                      value={companyData.cellphone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.cellphone
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Telefone Fixo</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="phone"
                      value={companyData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.phone
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Rua/Logradouro</h2>
                <span className={style.profileInput2}>
                  {editable ? (
                    <input
                      type="text"
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.address
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Bairro</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="bairro"
                      value={companyData.bairro}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.bairro
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Complemento</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="complemento"
                      value={companyData.complemento}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.complemento
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Cidade</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="city"
                      value={companyData.city}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.city
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>UF</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="state"
                      value={companyData.state}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.state
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>CEP</h2>
                <span className={style.profileInput}>
                  {editable ? (
                    <input
                      type="text"
                      name="zipcode"
                      value={companyData.zipcode}
                      onChange={handleInputChange}
                    />
                  ) : (
                    company.zipcode
                  )}
                </span>
              </div>
            </section>

            {/* Botões de edição e salvar */}
            {!editable && (
              <button className={style.edtSave} onClick={handleEdit}>
                Editar
              </button>
            )}
            {editable && (
              <button className={style.edtSave} onClick={handleSave}>
                Salvar
              </button>
            )}

            {/* <section className={style.documents}>
              <div className={style.documentsHeader}>
                <h2 className={style.subtitle}>Documentos:</h2>
                <Modal label="Novo Documento">
                  <DocumentForm handleSubmit={onSubmitModalForm} />
                </Modal>
              </div>
              <DocumentWrapper data={id} />
            </section> */}
            <DocumentWrapper data={id} />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default EntrepriseProfile;
