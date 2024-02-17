import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useData } from "../../src/hooks/useData";
import Footer from "../../component/Footer";
import style from "./ClientProfile.module.css";

const ClientProfile = () => {
  const { id } = useParams();

  const { ["data"]: client, loading, error, request } = useData();

  useEffect(() => {
    request("GET", `client/${id}`, { withCredentials: true });
  }, []);
  console.log(client);

  const [editable, setEditable] = useState(false); // Estado para controlar se os campos estão editáveis
  const [clientData, setclientData] = useState(client); // Estado para armazenar os dados editáveis

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setEditable(true);
  };

  // Função para salvar as alterações
  // const handleSave = async () => {
  // try {
  // Faça uma solicitação para salvar os dados editados
  // Por exemplo: await axios.put(`/api/company/${id}`, clientData);
  // setEditable(false); // Desativa o modo de edição após salvar
  // } catch (error) {
  // console.error("Erro ao salvar os dados:", error);
  // }
  // };

  // Função para atualizar o estado com os novos valores dos campos editáveis

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  // Cria uma cópia dos dados da empresa
  // const updatedclientData = { ...clientData };
  // Atualiza apenas o campo modificado
  // updatedclientData[name] = value;
  // Atualiza o estado com os novos dados da empresa
  // setclientData(updatedclientData);
  // };

  return (
    <main className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.button}>
          <Link to="/client" className={style.buttons}>
            <button>Clientes</button>
          </Link>

          <Link to="/home" className={style.buttons}>
            <button>HOME</button>
          </Link>
        </div>

        {!client && error && (
          <>
            <div className={style.errorContainer}>
              <h1>Cliente não encontrado</h1>
              {error && "Não foi possível carregar os dados"}
            </div>
          </>
        )}

        {client && !error && !loading && (
          <>
            <h1 className={style.title1}>{client.name}</h1>

            <section className={style.profile}>
              <div className={style.profileItem}>
                <h2>CPF</h2>
                <span>
                  {editable ? (
                    <input
                      type="text"
                      name="cnpj"
                      value={clientData.cpf}
                      onChange={handleInputChange}
                    />
                  ) : (
                    client.cpf
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>E-mail</h2>
                <span>
                  {editable ? (
                    <input
                      type="text"
                      name="email"
                      value={clientData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    client.email
                  )}
                </span>
              </div>

              <div className={style.profileItem}>
                <h2>Telefone</h2>
                <span>
                  {editable ? (
                    <input
                      type="text"
                      name="cellphone"
                      value={clientData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    client.phone ?? "Nenhum número cadastrado"
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
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ClientProfile;
