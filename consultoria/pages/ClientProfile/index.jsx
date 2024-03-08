import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useData } from "../../src/hooks/useData";
import { useFetch } from "../../src/hooks/useFetch";
import Footer from "../../component/Footer";
import style from "./ClientProfile.module.css";

const ClientProfile = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { editData } = useFetch();
  const { ["data"]: client, loading, error, request } = useData();
  console.log(id);
  console.log(client);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () =>
    await request("GET", `client/${id}`, { withCredentials: true });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const [editable, setEditable] = useState(false); // Estado para controlar se os campos estão editáveis
  // const [clientData, setclientData] = useState(client); // Estado para armazenar os dados editáveis

  // console.log(client.name);
  // Função para ativar o modo de edição
  const handleEdit = () => {
    setEditable(true);
    setValue("name", client.name);
    setValue("cpf", client.cpf);
    setValue("email", client.email);
    setValue("phone", client.phone);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data = {
      ...data,
      id: data.id,
    };
    try {
      const { response, status } = await editData(`client/${id}`, data);

      if (status !== 201) {
        setMessage(response.data);
        throw new Error(response.data);
      }

      setMessage("Cadastro atualizado com sucesso!");
      // handleFormSubmit();
    } catch ({ message }) {
      setMessage(message);
    }
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
              {message}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.profileItem}>
                  <h2>Nome</h2>
                  <span>
                    {editable ? (
                      <input type="text" {...register("name")} />
                    ) : (
                      client.name
                    )}
                  </span>
                </div>
                <div className={style.profileItem}>
                  <h2>CPF</h2>
                  <span>
                    {editable ? (
                      <input type="text" name="cpf" {...register("cpf")} />
                    ) : (
                      client.cpf
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>E-mail</h2>
                  <span>
                    {editable ? (
                      <input type="text" {...register("email")} />
                    ) : (
                      client.email
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Telefone</h2>
                  <span>
                    {editable ? (
                      <input type="text" {...register("phone")} />
                    ) : (
                      client.phone ?? "Nenhum número cadastrado"
                    )}
                  </span>
                </div>
                {!editable && (
                  <button className={style.edtSave} onClick={handleEdit}>
                    Editar
                  </button>
                )}
                {editable && (
                  <button className={style.edtSave} type="submit">
                    Salvar
                  </button>
                )}
              </form>
            </section>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ClientProfile;
