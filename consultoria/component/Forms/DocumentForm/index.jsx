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
    formState: { isSubmitting, errors },
  } = useForm();

  const { postData } = useFetch();

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("file", data.file[0]);

    // console.log(formData);
    data = {
      ...data,
      // ...data.file[0],
      file: data.file[0],
      // file: data.file[0],
      // size: data.file[0].size,
      // name: data.file[0].name,
    };
    // formData.append("recipe", JSON.stringify(data));

    console.log(formData);

    postData("document/upload", data);
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
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          label="Nome"
          placeholder="Insira o nome do documento"
        />
        <Input {...register("emission")} label="Data de Emissão" type="date" />

        <Input {...register("validity")} label="Data de validade" type="date" />

        {/* <Select {...register("clientId")} label="Empresa" data={[]} /> */}

        {/* <Select {...register("clientId")} label="Tipo de documento" data={[]} /> */}

        <input {...register("company")} value={"65b3b75d413fd3683f846855"} />

        {/* <Input
          {...register("file")}
          label="Anexar arquivo"
          type="file"
          name="file"
          
        /> */}
        <input {...register("file")} type="file" name="file" />

        <button className={styles.buttonSubmit}>Enviar</button>
      </form>
    </>
  );
};
