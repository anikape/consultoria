import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { useFetch } from "../../../src/hooks/useFetch";
import { useData } from "../../../src/hooks/useData";
import { Select } from "../../Select";
import { Option } from "../../Option";

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
    request("get", "company", { withCrendentials: true });
  }, [request]);

  console.log(companys);

  const onSubmit = (data) => {
    data = {
      ...data,
      file: data.file[0],
    };

    uploadFile("document/upload", data);
    console.log(data);
  };

  // const handleFileChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     arquivo: event.target.files[0],
  //   });
  // };

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
          label="Nome"
          placeholder="Insira o nome do documento"
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

        <Select {...register("clientId")} label="Empresa">
          {companys?.map(({ id, companyName }) => (
            <Option data={(id, companyName)} />
          ))}
        </Select>

        <Select
          {...register("clientId")}
          label="Tipo de documento"
          data={companys}
        />

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
