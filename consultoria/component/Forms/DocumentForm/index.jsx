import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { useFetch } from "../../../src/hooks/useFetch";
import { useData } from "../../../src/hooks/useData";
import { Select } from "../../Select";

import styles from "./DocumentForm.module.css";

export const DocumentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const { uploadFile } = useFetch();
  const { ["data"]: companys, loading, error, request } = useData();

  useEffect(() => {
    const loadData = async () =>
      await request("get", "company", { withCrendentials: true });
    loadData();
  }, [request]);

  const onSubmit = (data) => {
    data = {
      ...data,
      file: data.file[0],
    };

    uploadFile("document/upload", data);
    console.log(data);
  };

  return (
    <>
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", { required: "Informe o nome do arquivo" })}
          label="Nome"
          placeholder="Insira o nome do documento"
          error={errors.name?.message}
        />
        <Input
          {...register("city", { required: "Informe uma cidade" })}
          label="Cidade"
          placeholder="Informe a cidade"
          error={errors.name?.message}
        />
        <Input
          {...register("emission", { required: "Informe a data de emissão" })}
          label="Data de Emissão"
          type="date"
          error={errors.emission?.message}
        />

        <Input
          {...register("validity", { required: "Informe a data de validade" })}
          label="Data de validade"
          type="date"
          error={errors.validity?.message}
        />

        <Select {...register("company")} label="Empresa">
          <option value="" disabled>
            Selecione uma empresa
          </option>
          {companys?.map(({ id, companyName }) => (
            <option key={id} value={id} disabled={id ? "" : "disabled"}>
              {id ? companyName : "carregando..."}
            </option>
          ))}
        </Select>

        <Select {...register("type")} label="Tipo de documento">
          <option value="" disabled>
            Selecione um tipo
          </option>
        </Select>

        <Input
          {...register("file")}
          label="Anexar arquivo"
          type="file"
          name="file"
        />

        <button className={styles.buttonSubmit}>Enviar</button>
      </form>
    </>
  );
};
