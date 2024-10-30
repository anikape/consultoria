import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useClient } from "@hooks/useClient";
import { useCompany } from "@hooks/useCompany";
import { formatCpfCnpj } from "@helpers/maskValues";

import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { useFetch } from "@hooks/useFetch";
import { Loading } from "@components/Loading";

import style from "@components/Forms/CompanyForm/CompanyForm.module.css";

export const CompanyForm = ({ label }) => {
  const { addCompany } = useCompany();
  const { clientList } = useClient();
  const { postData } = useFetch();
  const [message, setMessage] = useState("");
  const {
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      zipcode: "",
    },
  });

  const cnpjRaw = watch("cnpj");
  const zipCode = watch("zipcode");

  useEffect(() => {
    setValue("cnpj", formatCpfCnpj(cnpjRaw));
    // setValue('cpf',formatCpfCnpj(cpfRaw))
  }, [cnpjRaw]);

  const handleSetData = useCallback((data) => {
    setValue("address", data.logradouro);
    setValue("city", data.localidade);
    setValue("state", data.uf);
    setValue("district", data.bairro);
  }, []);

  const handleFetchCEP = useCallback(
    async (zipCode) => {
      const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
      const response = await data.json();

      handleSetData(response);
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    data = {
      ...data,
      cnpj: formatCpfCnpj(data.cnpj),
    };

    try {
      const response = await postData("company", data);

      if (response.status !== 201) {
        setMessage(response.data);
        throw new Error(response.data);
      }

      const newCompany = response.data;
      addCompany(newCompany);
      console.log(response);
      setMessage("Empresa cadastrada com sucesso!");
    } catch ({ message }) {
      setMessage(message);
    }
  };

  useEffect(() => {
    if (zipCode.length !== 8) {
      return;
    }
    handleFetchCEP(zipCode);
  }, [handleFetchCEP, setValue, zipCode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  if (clientList === null) {
    return null;
  }

  return (
    <>
      {isSubmitting ? (
        <Loading />
      ) : (
        <>
          <div className={style.errorMessage}>{message}</div>
          <div className={style.form}>
            <div className={style.formGroup}>
              <Select
                {...register("clientId", { required: "Selecione um cliente" })}
                label="Cliente"
                error={errors.clientId?.message}
              >
                <option value="" disabled>
                  Selecione uma empresa
                </option>
                {clientList?.map(({ id, name }) => (
                  <option key={id} value={id} disabled={!id ? "disabled" : ""}>
                    {id ? name : "carregando..."}
                  </option>
                ))}
              </Select>
              <Input
                {...register("companyName", {
                  required: "Campo obrigatório",
                  minLength: 3,
                  message: "Digite mais de 3 caracteres",
                })}
                label="Nome fantasia"
                placeholder="Insira o nome fantasia"
                error={errors.companyName?.message}
              />
            </div>
            <div className={style.formGroup}>
              <Input
                {...register("cnpj", {
                  required: "Campo obrigatório",
                  validate: { teste: (v) => formatCpfCnpj(v) },
                  maxLength: {
                    value: 14,
                    message: "CPF/CNPJ deve conter 14 caracteres.",
                  },
                  minLength: {
                    value: 11,
                    message: "CPF/CNPJ deve conter no mínimo 11 caracteres.",
                  },

                  pattern: {
                    value:
                      /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
                    message:
                      "Digite um CPF ou CNPJ válido, informe apenas número",
                  },
                })}
                type="text"
                label="CPF/CNPJ"
                placeholder="Insira um CPF ou CNPJ"
                error={errors.cnpj?.message}
                maxLength={14}
                minLength={11}
                // Verifica se há erro e passa a mensagem de erro
              />
              {console.log("CNPJ error:", errors.cnpj?.message)}
              <Input
                {...register("mainActivity")}
                label="Atividade"
                placeholder="Insira o ramo de atividade"
              />
            </div>
            <div className={style.formGroup}>
              <Input
                {...register("cnae", {
                  setValueAs: (value) => parseInt(value),
                  required: "Campo obrigatório",
                })}
                label="CNAE"
                type="text"
                placeholder="Insira o código CNAE"
                error={errors.cnae?.message}
              />
              <Input
                {...register("secondaryCnae")}
                label="CNAE Secundário"
                placeholder="Insira o código CNAE Secundário"
              />
            </div>
            <div className={style.formGroup}>
              <Input
                {...register("email", { required: "Campo obrigatório" })}
                label="Email"
                placeholder="Insira o email"
                error={errors.email?.message}
              />

              <Input
                {...register("phone", {
                  required: "Campo obrigatório",
                  maxLength: { value: 12, message: "Digite apenas números" },
                  pattern: {
                    value: /^[0-9]{10,12}$/,
                    message: "Digite apenas números",
                  },
                })}
                type="text"
                label="Telefone"
                placeholder="Insira o número de telefone"
                error={errors.phone?.message}
              />
              <Input
                {...register("cellphone")}
                label="Celular"
                placeholder="Insira o número de celular"
              />
            </div>
            <div className={style.formGroup}>
              <Input
                {...register("zipcode", { required: "Campo obrigatório" })}
                type="text"
                label="CEP"
                placeholder="Insira o CEP apenas números"
                error={errors.zipcode?.message}
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
                {...register("district")}
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
                {...register("addressComplement")}
                label="Complemento"
                placeholder="Insira um complemento"
              />
            </div>
            <div className={style.formGroup}>
              <Input
                {...register("comments")}
                label="Comentários"
                placeholder="Insira os comentários"
              />
            </div>
            <div className={style.buttons}>
              <button
                className={style.button}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
              <button className={style.button2} type="reset">
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
