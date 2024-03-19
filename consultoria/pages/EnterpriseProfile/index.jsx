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

  const { deleteCompany, editData } = useFetch();
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm();
  const { ["data"]: company, loading, error, request } = useData();

  const loadData = async () => await request("GET", `company/${id}`, { withCredentials: true });

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
    // Outros campos...
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
          window.location.href = "/client"; // Redireciona para a rota /client após a exclusão
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

              {message}
              <section className={style.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Formulário de edição aqui... */}

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
                              <button
                                className={style.edtSave}
                                type="submit"
                              >
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
