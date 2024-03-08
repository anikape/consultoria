import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { useFetch } from "../../../src/hooks/useFetch";
import { useData } from "../../../src/hooks/useData";
import { Select } from "../../Select";

import styles from "./DocumentForm.module.css";
import LoadingSpinner from "../../LoadingSpinner";

export const DocumentForm = ({ handleFormSubmit }) => {
  const [message, setMessage] = useState("");
  const [companys, setCompany] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { request } = useData();
  const { uploadFile } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const [companysData, typesData] = await Promise.all([
        request("get", "company", { withCredetials: true }),
        request("get", "types", { withCredetials: true }),
      ]);

      setCompany(companysData.json);
      setTypes(typesData.json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      file: data.file[0],
    };

    try {
      const { status } = await uploadFile("document/upload", data);

      if (status !== 201) {
        setMessage("Erro ao enviar aquivo");
        handleFormSubmit();
        throw new Error("Não foi possível enviar o arquivo");
      }

      setMessage("Arquivo enviado com sucesso!");
    } catch ({ message }) {
      setMessage(message);
    }

    console.log(data);
  };

  return (
    <>
      <div>{message}</div>

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
          {!loading && (
            <>
              <option value="" disabled>
                Selecione uma empresa
              </option>
              {...companys?.map(({ id, companyName }) => (
                <option key={id} value={id} disabled={id ? "" : "disabled"}>
                  {id ? companyName : "carregando..."}
                </option>
              ))}
            </>
          )}
        </Select>

        <Select {...register("type")} label="Tipo de documento">
          {!loading && (
            <>
              <option value="" disabled>
                Selecione um tipo
              </option>
              {...types?.map(({ _id, description }) => (
                <option key={_id} value={_id} disabled={_id ? "" : "disabled"}>
                  {_id ? description : "carregando..."}
                </option>
              ))}
            </>
          )}
        </Select>

        <Input
          {...register("file")}
          label="Anexar arquivo"
          type="file"
          name="file"
        />

        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <>
            <button className={styles.buttonSubmit}>Enviar</button>
          </>
        )}
      </form>
    </>
  );
};
