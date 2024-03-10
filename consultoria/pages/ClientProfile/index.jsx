import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../component/LoadingSpinner";
import { useData } from "../../src/hooks/useData";
import { useFetch } from "../../src/hooks/useFetch";
import { Input } from "../../component/Input";
import ErrorComponent from "../../component/ErrorComponente/ErrorComponent";
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
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);
  
  

  const loadData = async () =>
    await request("GET", `client/${id}`, { withCredentials: true });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const [editable, setEditable] = useState(false); 
  
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
  
  const handleDele = async (id) => {
    const userConfirmed = window.confirm('Deseja realmente apagar o registro? Essa ação não pode ser desfeita.');

    try {
      
      if (userConfirmed) {
      // await deleteData(`document/${documentId}`, documentId);
        console.log('apagou')
       
      } else {

        console.log('Operação de exclusão cancelada pelo usuário.');

      }
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
  };

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
              <form className={style.editForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.profileItem}>
                  <h2>Nome</h2>
                  <span>
                    {editable ? (
                      <Input {...register("name")}/>
                    ) : (
                      client.name
                    )}
                  </span>
                </div>
                <div className={style.profileItem}>
                  <h2>CPF</h2>
                  <span>
                    {editable ? (
                      <Input  name="cpf" {...register("cpf",{required:"Campo Obrigatório"})} 
                      error={errors.cpf?.message}
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
                      <>
                      <Input  {...register("email",{required:"Campo obrigatório"})}
                      error={errors.email?.message}
                      />
                      </>
                    ) : (
                      client.email
                    )}
                  </span>
                </div>

                <div className={style.profileItem}>
                  <h2>Telefone</h2>
                  <span>
                    {editable ? (
                      <Input {...register("phone")}/>
                    ) : (
                      client.phone ?? "Nenhum número cadastrado"
                    )}
                  </span>
                </div>
                 {isSubmitting ? <LoadingSpinner/>:<>
                 <div className={style.groupButtons}>
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
                
                 {!editable && (
                 <button className={style.edtSave} onClick={handleDele}>
                    Excluir
                  </button>
                )}
                {editable && (
                  <button className={style.edtSave} onClick={()=>setEditable(false)} >
                    Cancelar
                  </button>
                )}
                
                
                
                </div>
                </>}
                
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
