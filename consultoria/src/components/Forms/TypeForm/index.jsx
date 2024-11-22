import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";

import { Input } from "@/components/Input";

import style from "@/components/Forms/TypeForm/TypeForm.module.css";

export const TypeForm = () => {
  const [message, setMessage] = useState("");
  const { postData } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await postData("/types", data);
      console.log(response);

      if (response?.status !== 201) {
        setMessage(response.response.data);
        throw new Error('"Erro ao criar novo tipo de documento."');
      }

      setMessage("Tipo de documento cadastrado com sucesso");
    } catch (error) {
      setMessage(error.response.data);
      setMessage("Erro ao criar novo tipo de documento.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formType}>
      <div>{message}</div>
      <div>
        <Input
          {...register("description", { required: "Campo obrigatório" })}
          placeholder="Novo tipo de documento"
        />
      </div>
      <p className={style.errorMessage}>{errors.description?.message}</p>
      <button className={style.button} type="submit">
        Criar
      </button>
    </form>
  );
};
