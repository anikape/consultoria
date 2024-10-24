import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useData } from "@/hooks/useData";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";

import { RiHomeHeartLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import Footer from "@/components/Footer";
import { DocumentWrapper } from "@/components/DocumentWrapper";
import { Input } from "@/components/Input";

import style from "@/pages/EnterpriseProfile/enterprise.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";

const EntrepriseProfile = () => {
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);

  const { deleteCompany, editData } = useFetch();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();
  const { ["data"]: company, loading, error, request } = useData();

  const loadData = async () =>
    await request("GET", `company/${id}`, { withCredentials: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = () => {
    setEditable(false); // Desativa o modo de edição
  };

  const handleEdit = () => {
    setEditable(true);
    setValue("companyName", company.companyName);
    setValue("cnpj", company.cnpj);
    setValue("address", company.address);
    setValue("cellphone", company.cellphone);
    setValue("city", company.city);
    setValue("cnae", company.cnae);
    setValue("comments", company.comments);
    setValue("addressComplement", company.addressComplement);
    setValue("district", company.district);
    setValue("email", company.email);
    setValue("mainActivity", company.mainActivity);
    setValue("phone", company.phone);
    setValue("state", company.state);
    setValue("zipcode", company.zipcode);
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

  const handleDelete = async () => {
    const userConfirmed = window.confirm(
      "Deseja realmente apagar o registro? Essa ação não pode ser desfeita."
    );

    try {
      if (userConfirmed) {
        const { response, status } = await deleteCompany(id);
        console.log(response); // Adicione este console.log para depurar
        if (status === 200) {
          setMessage("Empresa excluída com sucesso!");
          // window.location.href = "/client"; // Redireciona para a rota /client após a exclusão
          navigate("/client");
        } else {
          setMessage(response.data.errors[0]);
        }
      } else {
        console.log("Operação de exclusão cancelada pelo usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
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

              <p>{message}</p>

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
                        <Input {...register("addressComplement")} />
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
                                  onClick={handleEdit}
                                >
                                  Editar
                                </button>
                                <button
                                  className={style.edtCancel}
                                  onClick={handleDelete}
                                >
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
                                  onClick={handleCancel}
                                >
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
