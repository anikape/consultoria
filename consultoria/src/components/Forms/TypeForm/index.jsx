import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";

import { Input } from "@components/Input";

import style from "@components/Forms/TypeForm/TypeForm.module.css";
import { Button } from "@components/Button";
import { SelectButton } from "@components/SelectButton";
import { useData } from "@hooks/useData";
import { useType } from "@hooks/useType";

export const TypeForm = () => {
  const [message, setMessage] = useState("");
  const { loading, error, request } = useData(false);
  const { deleteData } = useFetch();
  const { typeList, addType, removeType, editType, loadTypes } = useType();
  const { postData } = useFetch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loadData = async () => {
    const response = await request("get", "types", { withCredentials: true });
    console.log(response);
    console.log(response.json);
    const typesData = response.json;
    console.log(typesData);

    await loadTypes(typesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async data => {
    try {
      const response = await postData("/types", data);
      console.log(response);

      if (response?.status !== 201) {
        setMessage(response.response.data);
        throw new Error('"Erro ao criar novo tipo de documento."');
      }

      const newType = response.data;
      await addType(newType);
      setMessage("Tipo de documento cadastrado com sucesso");
      reset();
    } catch (error) {
      setMessage(error.response.data);
      setMessage("Erro ao criar novo tipo de documento.");
    }
  };

  const handleDelete = async id => {
    try {
      const response = await deleteData(`types/${id}`, {
        withCredentials: true,
      });

      if (response.status !== 204) {
        throw new Error("Não foi possivel exluir o tipo");
      }

      await removeType(id);
      console.log(response);
      console.log(id);
    } catch (error) {
      console.log(id);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {loading && <p>Carregando...</p>}
        {!loading && (
          <SelectButton
            types={typeList}
            // onDelete={removeType}
            onDelete={handleDelete}
            onEdit={editType}
          />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formType}>
        <div className={style.error}>{message}</div>
        <div className={style.inputGroup}>
          <Input
            {...register("description", { required: "Campo obrigatório" })}
            placeholder="Novo tipo de documento"
          />
        </div>
        <p className={style.errorMessage}>{errors.description?.message}</p>
        <Button variant={"confirm"}>Criar</Button>
      </form>
    </>
  );
};
