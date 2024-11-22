import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useData } from "@hooks/useData";
import { useForm } from "react-hook-form";
import { useFetch } from "@hooks/useFetch";
import { useCompany } from "@hooks/useCompany";

import { RiHomeHeartLine } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import Footer from "@components/Footer";
import { DocumentWrapper } from "@components/DocumentWrapper";
import { Input } from "@components/Input";
import LoadingSpinner from "@components/LoadingSpinner";

import style from "@pages/EnterpriseProfile/enterprise.module.css";

const EntrepriseProfile = () => {
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);
  const { deleteCompany, editData } = useFetch();
  const { editCompany, companyList, loadCompanys } = useCompany();
  const { loading, error, request } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const loadData = async () => {
    try {
      const { response, json } = await request("GET", `company/${id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Não foi possivel obter os dados");
      }

      const company = json;

      await loadCompanys([company]);
    } catch (error) {
      loadCompanys([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    // const loadData = async () => {
    //   await request("GET", `company/${id}`, { withCredentials: true });
    // };
    loadData();
  }, [id, request]);

  const handleCancel = () => {
    setEditable(false); // Desativa o modo de edição
  };

  const handleEdit = company => {
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

  const onSubmit = async data => {
    data = { ...data, id };

    try {
      const response = await editData(`company/${id}`, data);

      if (response.status !== 200) {
        setMessage(response.data.errors[0]);
        throw new Error(response.data.errors[0]);
      }

      const editedComapany = response.data;
      editCompany(editedComapany);
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
      if (!userConfirmed) {
        setMessage("Operação de exclusão cancelada pelo usuário.");
        return;
      }

      const { response, status } = await deleteCompany(id);

      if (status !== 204) {
        throw new Error(response.data.errors[0]);
      }

      setMessage("Empresa excluída com sucesso!");
      loadCompanys([]);
      navigate("/client");
    } catch (error) {
      setMessage("Erro ao excluir empresa");
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

          {companyList.length <= 0 && error && (
            <>
              <div className={style.errorContainer}>
                <h1>Empresa não encontrada</h1>
                {error && "Não foi possível carregar os dados"}
              </div>
            </>
          )}

          {loading && <LoadingSpinner />}

          {companyList.length > 0 &&
            !error &&
            !loading &&
            companyList?.map(company => (
              <div key={company.id}>
                <h1 className={`${style.title1} ${style.clientName}`}>
                  {company.companyName}
                </h1>

                <p className={style.message}>{message}</p>

                <section className={style.formContainer}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.profile}>
                      <div className={style.profileItem}>
                        <h2>Nome da empresa</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.companyName}
                              {...register("companyName")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.companyName}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>CPF/CNPJ</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.cnpj}
                              {...register("cnpj")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.cnpj}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Ramo de atividade</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.mainActivity}
                              {...register("mainActivity")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.mainActivity}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>CNAE</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.cnae}
                              {...register("cnae")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.cnae}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>E-mail</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.email}
                              {...register("email")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.email}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Telefone Celular</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.cellphone}
                              {...register("cellphone")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.cellphone}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Telefone Fixo</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.phone}
                              {...register("phone")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.phone}
                          </span>
                        )}
                      </div>

                      <div className={style.profileItem}>
                        <h2>Rua/Logradouro</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.address}
                              {...register("address")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput2}>
                            {company.address}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Bairro</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.district}
                              {...register("district")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.district}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Complemento</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.addressComplement}
                              {...register("addressComplement")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.complemento}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Cidade</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.city}
                              {...register("city")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.city}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>UF</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.state}
                              {...register("state")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.state}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>CEP</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.zipcode}
                              {...register("zipcode")}
                            />
                          </span>
                        ) : (
                          <span className={style.profileInput}>
                            {company.zipcode}
                          </span>
                        )}
                      </div>
                      <div className={style.profileItem}>
                        <h2>Comentários</h2>
                        {editable ? (
                          <span className={style.profileInput}>
                            <input
                              defaultValue={company.comments}
                              {...register("comments")}
                            />
                          </span>
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
                                    onClick={() => handleEdit(company)}>
                                    Editar
                                  </button>
                                  <button
                                    className={style.edtCancel}
                                    onClick={handleDelete}
                                    type="button">
                                    Excluir
                                  </button>
                                </>
                              )}
                              {editable && (
                                <>
                                  <button
                                    className={style.edtSave}
                                    type="submit">
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
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default EntrepriseProfile;
