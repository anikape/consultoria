import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { RiHomeHeartLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import { useData } from "@hooks/useData";
import { useFetch } from "@hooks/useFetch";
import { useClient } from "@hooks/useClient";

import LoadingSpinner from "@components/LoadingSpinner";
import { Button } from "@/components/Button";
import Footer from "@components/Footer";

import style from "@pages/ClientProfile/ClientProfile.module.css";
import { Modal } from "@/components/Modal";
import { Document } from "@/components/Document";

const ClientProfile = () => {
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);
  const { editClient, removeClient, loadClients, clientList } = useClient();
  const { deleteClient, editData } = useFetch(); // Adicione deleteClient aqui
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, request } = useData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const loadData = async () => {
    try {
      const { response, json } = await request("GET", `client/${id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Não foi possivel obter os dados");
      }

      const client = json;
      loadClients([client]);
    } catch (error) {
      loadClients([]);
    }
  };

  const handleEdit = client => {
    setEditable(true);
    setValue("name", client.name);
    setValue("cpf", client.cpf);
    setValue("email", client.email);
    setValue("phone", client.phone);
  };

  const onSubmit = async data => {
    data = { ...data, id };

    try {
      const response = await editData(`client/${id}`, data);

      if (response.status !== 200) {
        setMessage(response.data.errors[0]);
        throw new Error(response.data.errors[0]);
      }

      const editedClient = response.data;

      editClient(editedClient);
      setMessage("Cadastro atualizado com sucesso!");

      setEditable(false);
    } catch ({ message }) {
      setMessage(message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteClient(id);

      if (response.status !== 204) {
        setMessage(response.data.errors[0]);
        throw new Error(response.data.error[0]);
      }

      await removeClient(id);
      setMessage("Cliente excluído com sucesso!");
      loadClients([]);
      navigate("/client");
    } catch (error) {
      setMessage("Erro ao excluir cliente");
      console.error("Erro ao excluir cliente:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <main className={style.ClientProfile}>
      <div className={style.container}>
        <div className={style.contentContainer}>
          <div className={style.button}>
            <Link to="/client" className={style.buttons}>
              <button>
                <FaUserGroup />
              </button>
            </Link>

            <Link to="/home" className={style.buttons}>
              <button className={style.homeButton}>
                <RiHomeHeartLine className={style.home} />
              </button>
            </Link>
          </div>
          {loading && <LoadingSpinner />}
          {clientList.length <= 0 && error && (
            <>
              <div className={style.errorContainer}>
                <h1>Cliente não encontrado</h1>
                {error && "Não foi possível carregar os dados"}
              </div>
            </>
          )}
          {clientList.length > 0 && !error && !loading && (
            <>
              <section className={style.formContainer}>
                {clientList.map(client => (
                  <div key={client.id}>
                    <h1 className={style.title1}>{client.name}</h1>
                    <section className={style.profile}>
                      <p className={style.message}>{message}</p>
                      <form
                        className={style.editForm}
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className={style.profileItem}>
                          <h2>Nome</h2>
                          {editable ? (
                            <span className={style.clientInput}>
                              <input
                                defaultValue={client.name}
                                {...register("name", {
                                  required: "Campo obrigatório",
                                })}
                              />
                              <p className={style.error}>
                                {errors.name?.message}
                              </p>
                            </span>
                          ) : (
                            <span className={style.clientInput}>
                              {client.name}
                            </span>
                          )}
                        </div>
                        <div className={style.profileItem}>
                          <h2>CPF</h2>
                          {editable ? (
                            <span className={style.clientInput}>
                              <input
                                defaultValue={client.cpf}
                                {...register("cpf", {
                                  required: "Campo obrigatório",
                                })}
                              />
                              <p className={style.error}>
                                {errors.cpf?.message}
                              </p>
                            </span>
                          ) : (
                            <span id="input1" className={style.clientInput}>
                              {client.cpf}
                            </span>
                          )}
                        </div>

                        <div className={style.profileItem}>
                          <h2>E-mail</h2>
                          {editable ? (
                            <>
                              <span className={style.clientInput}>
                                <input
                                  defaultValue={client.email}
                                  {...register("email")}
                                />
                                <p className={style.error}>
                                  {errors.email?.message}
                                </p>
                              </span>
                            </>
                          ) : (
                            <span className={style.clientInput}>
                              {client.email}
                            </span>
                          )}
                        </div>

                        <div className={style.profileItem}>
                          <h2>Telefone</h2>
                          {editable ? (
                            <span className={style.clientInput}>
                              <input
                                defaultValue={client.phone}
                                {...register("phone")}
                              />
                            </span>
                          ) : (
                            <span className={style.clientInput}>
                              {client.phone ?? "Nenhum número cadastrado"}
                            </span>
                          )}
                        </div>
                        {isSubmitting ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <div className={style.groupButtons}>
                              {!editable && (
                                <Button
                                  variant={"confirm"}
                                  onClick={() => handleEdit(client)}>
                                  Editar
                                </Button>
                              )}
                              {editable && (
                                <Button variant={"confirm"}>Salvar</Button>
                              )}

                              {!editable && (
                                <Modal.Context>
                                  <Modal.Button
                                    action={"open"}
                                    title="Excluir"></Modal.Button>
                                  <Modal.Body>
                                    <Modal.Content label="Excluir Cliente">
                                      <p className={style.deleteParagraph}>
                                        Deseja realmente apagar o registro? Essa
                                        ação não pode ser desfeita.
                                      </p>
                                      <p className={style.deleteParagraph}>
                                        <strong>{client.name}</strong>
                                      </p>
                                      <div className={style.deleteGroupButtons}>
                                        <Modal.Button
                                          action={"close"}
                                          title="Cancelar"
                                        />
                                        <Button
                                          variant={"confirm"}
                                          onClick={handleDelete}
                                          type="button">
                                          Excluir
                                        </Button>
                                      </div>
                                    </Modal.Content>
                                  </Modal.Body>
                                </Modal.Context>
                              )}
                              {editable && (
                                <Button
                                  variant={"cancel"}
                                  onClick={() => setEditable(false)}>
                                  Cancelar
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </form>
                    </section>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ClientProfile;
