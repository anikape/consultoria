import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { useFetch } from "../../../src/hooks/useFetch";
import { Select } from "../../Select";

import styles from "./DocumentForm.module.css";

export const DocumentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { postData } = useFetch();

  const onSubmit = (data) => {
    // postData("client", data);
    console.log(data);
  };

  const [formData, setFormData] = useState({
    nome: "",
    dataEmissao: "",
    dataVencimento: "",
    empresa: "",
    tipoDocumento: "",
    arquivo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      arquivo: event.target.files[0],
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  //   // handleClose();
  // };

  return (
    <>
      <form className={styles.formContent} onSubmit={"handleSubmit"}>
        <Input
          {...register("nome")}
          label="Nome"
          placeholder="Insira o nome do documento"
        />
        <Input {...register("emission")} label="Data de Emissão" type="date" />

        <Input {...register("validity")} label="Data de validade" type="date" />

        <Select {...register("clientId")} label="Empresa" data={[]} />

        <Select {...register("clientId")} label="Tipo de documento" data={[]} />

        <Input {...register("name")} label="Anexar arquivo" type="file" />

        <button
          className={styles.buttonSubmit}
          onClick={handleSubmit(onSubmit)}>
          Enviar
        </button>
      </form>
    </>
  );
};
