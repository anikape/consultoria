import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useData } from "../../src/hooks/useData";
import { useForm } from "react-hook-form";
import { useFetch } from "../../src/hooks/useFetch";

import { RiHomeHeartLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import Footer from "../../component/Footer";
import { DocumentWrapper } from "../../component/DocumentWrapper";
import { Input } from "../../component/Input";

import style from "./enterprise.module.css";
import LoadingSpinner from "../../component/LoadingSpinner";

const EntrepriseProfile = () => {
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);

  const { editData } = useFetch();

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const { ["data"]: company, loading, error, request } = useData();
  console.log(company);

  const loadData = async () =>
    await request("GET", `company/${id}`, { withCredentials: true });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  console.log(company);

  const handleCancel = () => {
    setEditable(false); // Desativa o modo de edição
  };

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setEditable(true);
    setValue("companyName", company.companyName);
    setValue("cnpj", company.cnpj);
    setValue("email", company.email);
    setValue("zipcode", company.zipcode);
    setValue("state", company.state);
    setValue("secondaryCnae", company.secondaryCnae);
    setValue("mainActivity", company.mainActivity);
    setValue("phone", company.phone);
    setValue("comments", company.comments);
    setValue("cnae", company.cnae);
    setValue("city", company.city);
    setValue("cellphone", company.cellphone);
    setValue("address", company.address);
  };

  const onSubmit = async (data) => {
    data = { ...data, id };

    try {
      const { response, status } = await editData(`company/${id}`, data);

      if (status !== 200) {
        setMessage(response.data.errors[0]);
        throw new Error(response.data.errors[0]);
      }
      setMessage("Cadastro atualizado com sucesso!");
      loadData();
      setEditable(false);
    } catch ({ message }) {
      setMessage(message);
    }
  };

  return (
    <main className={style.company}>
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
              <h1 className={`${style.title1} ${style.clientName}`}>
                {company.companyName}
              </h1>

              {message}
              <section className={style.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={style.profile}>
                    <div className={style.profileItem}>
                      <h2>Nome da empresa</h2>
                      {editable ? (
                        <Input {...register("companyName")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.companyName}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>CPF/CNPJ</h2>
                      {editable ? (
                        <Input {...register("cnpj")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.cnpj}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Ramo de atividade</h2>
                      {editable ? (
                        <Input {...register("mainActivity")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.mainActivity}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>CNAE</h2>
                      {editable ? (
                        <Input {...register("cnae")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.cnae}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>E-mail</h2>
                      {editable ? (
                        <Input {...register("email")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.email}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Telefone Celular</h2>
                      {editable ? (
                        <Input {...register("cellphone")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.cellphone}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Telefone Fixo</h2>
                      {editable ? (
                        <Input {...register("phone")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.phone}
                        </span>
                      )}
                    </div>

                    <div className={style.profileItem}>
                      <h2>Rua/Logradouro</h2>
                      {editable ? (
                        <Input {...register("address")} />
                      ) : (
                        <span className={style.profileInput2}>
                          {company.address}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Bairro</h2>
                      {editable ? (
                        <Input {...register("district")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.district}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Complemento</h2>
                      {editable ? (
                        <Input {...register("complemento")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.complemento}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Cidade</h2>
                      {editable ? (
                        <Input {...register("city")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.city}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>UF</h2>
                      {editable ? (
                        <Input {...register("state")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.state}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>CEP</h2>
                      {editable ? (
                        <Input {...register("zipcode")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.zipcode}
                        </span>
                      )}
                    </div>
                    <div className={style.profileItem}>
                      <h2>Comentários</h2>
                      {editable ? (
                        <Input {...register("comments")} />
                      ) : (
                        <span className={style.profileInput}>
                          {company.comments}
                        </span>
                      )}
                    </div>
                  </div>

                  <>
                    <div>
                      {isSubmitting ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <div className={style.groupButtons}>
                            {!editable && (
                              <>
                                <button
                                  className={style.edtSave}
                                  onClick={handleEdit}>
                                  Editar
                                </button>
                                <button
                                  className={style.edtCancel}
                                  onClick={handleCancel}>
                                  Excluir
                                </button>
                              </>
                            )}
                            {editable && (
                              <>
                                <button className={style.edtSave} type="submit">
                                  Salvar
                                </button>

                                <button
                                  className={style.edtCancel}
                                  onClick={handleCancel}>
                                  Cancelar
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                </form>
              </section>

              <DocumentWrapper data={id} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default EntrepriseProfile;
