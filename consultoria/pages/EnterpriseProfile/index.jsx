import {useEffect, useState} from "react";
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

const EntrepriseProfile = () => {
  const [message, setMessage] = useState('')
  const [editable, setEditable] = useState(false);

  const { editData } = useFetch()

  const { id } = useParams();
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
    loadData()
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

    console.log(data);
    try {
      const { response, status } = await editData(`company/${id}`, data);

      console.log("dentro do submit:", response)
      console.log("dentro do submit:", status)

      if (status !== 200) {
        setMessage(response.data.errors[0]);
        throw new Error(response.data.errors[0]);
      }
      setMessage("Cadastro atualizado com sucesso!");
      loadData()
      setEditable(false)
    } catch ({ message }) {
      setMessage(message);
    }
  };

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

            <section className={style.profile}>
              {message}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.profileItem}>
                  <h2>Nome da empresa</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('companyName')} />
                    ) : (
                      company.companyName
                    )}
                  </span>
                </div>
                <div className={style.profileItem}>
                  <h2>CPF/CNPJ</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('cnpj')} />
                    ) : (
                      company.cnpj
                    )}
                  </span>
                </div>
                <div className={style.profileItem}>
                  <h2>Ramo de atividade</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('mainActivity')} />
                    ) : (
                      company.mainActivity
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>CNAE</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('cnae')} />
                    ) : (
                      company.cnae
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>E-mail</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('email')} />
                    ) : (
                      company.email
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Telefone Celular</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('cellphone')} />
                    ) : (
                      company.cellphone
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Telefone Fixo</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('phone')} />
                    ) : (
                      company.phone
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Rua/Logradouro</h2>
                  <span className={style.profileInput2}>
                    {editable ? (
                      <Input {...register('address')} />
                    ) : (
                      company.address
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Bairro</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('bairro')} />
                    ) : (
                      company.bairro
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Complemento</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('complemento')} />
                    ) : (
                      company.complemento
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Cidade</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('city')} />
                    ) : (
                      company.city
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>UF</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('state')} />
                    ) : (
                      company.state
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>CEP</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('zipcode')} />
                    ) : (
                      company.zipcode
                    )}
                  </span>
                </div>
                <div className={style.profileItem}>
                  <h2>Comentários</h2>
                  <span className={style.profileInput}>
                    {editable ? (
                      <Input {...register('comments')} />
                    ) : (
                      company.comments
                    )}
                  </span>
                </div>

                <>
                  <div className={style.groupButtons}>
                    {!editable && (
                      <>
                        <button className={style.edtSave} onClick={handleEdit}>
                          Editar
                        </button>
                        <button className={style.edtCancel} onClick={handleCancel}>
                          Cancelar
                        </button>
                      </>
                    )}
                    {editable && (
                      <>
                        <button className={style.edtSave} type='submit'>
                          Salvar
                        </button>

                        <button className={style.edtCancel} onClick={handleCancel}>
                          Cancelar
                        </button>
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
      <Footer />
    </main>
  );
};

export default EntrepriseProfile;
