import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { RiHomeHeartLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import { useData } from "@hooks/useData";
import { useFetch } from "@hooks/useFetch";
import { useClient } from "@hooks/useClient";

import LoadingSpinner from "@components/LoadingSpinner";
import { Input } from "@components/Input";
import ErrorComponent from "@components/ErrorComponente";
import Footer from "@components/Footer";

import style from "@pages/ClientProfile/ClientProfile.module.css";

const ClientProfile = () => {
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);
  const { editClient, removeClient, loadClients, clientList } = useClient();
  const { deleteClient, editData } = useFetch(); // Adicione deleteClient aqui
  const { id } = useParams();
  const { loading, error, request } = useData();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const loadData = async () => {
    const response = await request("GET", `client/${id}`, {
      withCredentials: true,
    });
    const client = response.json;
    await loadClients([client]);
  };

  const handleEdit = (client) => {
    setEditable(true);
    setValue("name", client.name);
    setValue("cpf", client.cpf);
    setValue("email", client.email);
    setValue("phone", client.phone);
  };

  const onSubmit = async (data) => {
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
    const userConfirmed = window.confirm(
      "Deseja realmente apagar o registro? Essa ação não pode ser desfeita."
    );

    try {
      if (userConfirmed) {
        const response = await deleteClient(id);

        if (response.status !== 204) {
          setMessage(response.data.errors[0]);
        }
        await removeClient(id);
        setMessage("Cliente excluído com sucesso!");
      } else {
        console.log("Operação de exclusão cancelada pelo usuário.");
      }
    } catch (error) {
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
    <main className={style.container}>
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

        {!clientList && error && (
          <>
            <div className={style.errorContainer}>
              <h1>Cliente não encontrado</h1>
              {error && "Não foi possível carregar os dados"}
            </div>
          </>
        )}

        {clientList && !error && !loading && (
          <>
            {clientList.map((client) => (
              <div key={client.id}>
                <h1 className={style.title1}>{client.name}</h1>
                <section className={style.profile}>
                  {message}
                  <form
                    className={style.editForm}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className={style.profileItem}>
                      <h2>Nome</h2>
                      {editable ? (
                        <Input {...register("name")} />
                      ) : (
                        <span className={style.clientInput}>{client.name}</span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>CPF</h2>
                      {editable ? (
                        <Input
                          name="cpf"
                          {...register("cpf", {
                            required: "Campo Obrigatório",
                          })}
                          error={errors.cpf?.message}
                        />
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
                          <Input
                            {...register("email", {
                              required: "Campo obrigatório",
                            })}
                            error={errors.email?.message}
                          />
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
                        <Input {...register("phone")} />
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
                            <button
                              className={style.edtSave}
                              onClick={() => handleEdit(client)}
                            >
                              Editar
                            </button>
                          )}
                          {editable && (
                            <button className={style.edtSave} type="submit">
                              Salvar
                            </button>
                          )}

                          {!editable && (
                            <button
                              className={style.edtSave}
                              onClick={handleDelete}
                            >
                              Excluir
                            </button>
                          )}
                          {editable && (
                            <button
                              className={style.edtSave}
                              onClick={() => setEditable(false)}
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </form>
                </section>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ClientProfile;
