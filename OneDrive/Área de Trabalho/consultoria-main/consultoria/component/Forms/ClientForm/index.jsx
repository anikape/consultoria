import {useEffect, useCallback} from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../src/hooks/useFetch";

import { Input } from "../../Input";

import style from "./ClientForm.module.css";

export const ClientForm = () => {
  const {
    register,
    // watch,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm(/*{
    defaultValues: {
      zipcode: "",
    },
  }*/);
  const { postData } = useFetch();

  const onSubmit = (data) => {
    postData("client", data);
    console.log(data);
  };

  // const zipCode = watch("zipcode");

  // const handleSetData = useCallback((data) => {
  //   setValue("street", data.logradouro);
  //   setValue("city", data.localidade);
  //   setValue("state", data.uf);
  //   setValue("bairro", data.bairro);
  // }, []);

  // const handleFetchCEP = useCallback(
  //   async (zipCode) => {
  //     const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
  //     const response = await data.json();

  //     handleSetData(response);
  //   },
  //   [setValue]
  // );

  // useEffect(() => {
  //   if (zipCode.length !== 8) {
  //     return;
  //   }
  //   handleFetchCEP(zipCode);
  // }, [handleFetchCEP, setValue, zipCode]);

  return (
    <>
      <Input {...register("name")} label="Nome" placeholder="Nome Completo" />
      <Input {...register("cpf")} label="CPF:" placeholder="CPF" />
      <Input {...register("email")} label="Email" placeholder="E-mail" />
      <Input {...register("phone")} label="Telefone:" placeholder="Telefone" />
      {/* <Input {...register("zipcode")} label="CEP" placeholder="CEP" />
      <Input {...register("state")} label="Estado" placeholder="Estado" />
      <Input {...register("city")} label="Cidade" placeholder="Cidade" />
      <Input {...register("bairro")} label="Bairro" placeholder="Bairro" />
      <Input
        {...register("street")}
        label="Rua/Logradouro"
        placeholder="Rua/Logradouro"
      /> */}

      <div className={style.buttons}>
        <button
          className={style.button1}
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        <button className={style.button2} onClick={"closeModal1"}>
          Cancelar
        </button>
      </div>
    </>
  );
};
