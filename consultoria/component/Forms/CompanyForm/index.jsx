import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import style from "./CompanyForm.module.css";
import { Input } from "../../Input";
import { Select } from "../../Select";
import { useData } from "../../../src/hooks/useData";
import { useFetch } from "../../../src/hooks/useFetch";
import { Loading } from "../../Loading";

export const CompanyForm = ({ clients }) => {
  const {
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      zipcode: "",
    },
  });
  const { postData } = useFetch();

  const onSubmit = async (data) => {
    console.log(data);
    postData("company", data);
  };

  const zipCode = watch("zipcode");

  const handleSetData = useCallback((data) => {
    setValue("address", data.logradouro);
    setValue("city", data.localidade);
    setValue("state", data.uf);
    setValue("bairro", data.bairro);
  }, []);

  const handleFetchCEP = useCallback(
    async (zipCode) => {
      const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
      const response = await data.json();

      handleSetData(response);
    },
    [setValue]
  );

  useEffect(() => {
    if (zipCode.length !== 8) {
      return;
    }
    handleFetchCEP(zipCode);
  }, [handleFetchCEP, setValue, zipCode]);

  // if (loading) {
  //   return <Loading />;
  // }

  if (clients === null) {
    return null;
  }

  return (
    <>
      {isSubmitting ? (
        <Loading />
      ) : (
        <div className={style.form}>
          <div className={style.formGroup}>
            <Select {...register("clientId")} label="Cliente" data={clients} />
            <Input
              {...register("companyName")}
              type="text"
              label="Nome fantasia"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("cnpj")}
              type="text"
              label="CNPJ"
              placeholder="Insira o CNPJ"
            />
            <Input
              {...register("mainActivity")}
              label="Atividade"
              placeholder="Insira o ramo de atividade"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("cnae", { setValueAs: (value) => parseInt(value) })}
              label="CNAE"
              type="text"
              placeholder="Insira o código CNAE"
            />
            <Input
              {...register("secondaryCnae")}
              label="CNAE Secundário"
              placeholder="Insira o código CNAE Secundário"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("email")}
              label="Email"
              placeholder="Insira o email"
            />

            <Input
              {...register("phone")}
              type="text"
              label="Telefone"
              placeholder="Insira o número de telefone"
            />
            <Input
              {...register("cellphone")}
              label="Celular"
              placeholder="Insira o número de celular"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("zipcode")}
              type="text"
              label="CEP"
              placeholder="Insira o CEP apenas números"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("state")}
              label="Estado"
              placeholder="Insira o estado"
            />
            <Input
              {...register("city")}
              label="Cidade"
              placeholder="Insira a cidade"
            />
            <Input
              {...register("bairro")}
              label="Bairro"
              placeholder="Insira o bairro"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("address")}
              label="Endereço"
              placeholder="Insira o endereço"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("comments")}
              label="Comentários"
              placeholder="Insira os comentários"
            />
          </div>

          <button
            className={style.button}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      )}
    </>
  );
};
