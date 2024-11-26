import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useClient } from "@hooks/useClient";
import { useCompany } from "@hooks/useCompany";
import { useModal } from "@components/Modal/ModalContext";
import { formatCpfCnpj } from "@helpers/maskValues";

import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { useFetch } from "@hooks/useFetch";
import { Loading } from "@components/Loading";

import style from "@components/Forms/CompanyForm/CompanyForm.module.css";
import { Button } from "@components/Button";

export const CompanyForm = ({ label }) => {
  const { addCompany } = useCompany();
  const { clientList } = useClient();
  const { postData } = useFetch();
  const { closeModal } = useModal();
  const [message, setMessage] = useState("");
  const {
    setValue,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      zipcode: "",
      cpf: "",
      companyName: "",
      email: "",
      cnpj: "",
      cnae: "",
      secondaryCnae: "",
      mainActivity: "",
      phone: "",
      cellphone: "",
      address: "",
      district: "",
      addressComplement: "",
      city: "",
      state: "",
      comments: "",
    },
  });

  const cnpjRaw = watch("cnpj");
  const zipCode = watch("zipcode");

  useEffect(() => {
    setValue("cnpj", formatCpfCnpj(cnpjRaw));
    // setValue('cpf',formatCpfCnpj(cpfRaw))
  }, [cnpjRaw]);

  const handleSetData = useCallback(data => {
    setValue("address", data.logradouro);
    setValue("city", data.localidade);
    setValue("state", data.uf);
    setValue("district", data.bairro);
  }, []);

  const handleFetchCEP = useCallback(
    async zipCode => {
      const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
      const response = await data.json();

      handleSetData(response);
    },
    [setValue]
  );

  const onSubmit = async data => {
    data = {
      ...data,
      cnpj: formatCpfCnpj(data.cnpj),
    };

    try {
      const response = await postData("company", data);
      console.log(response);

      if (response.status !== 201) {
        const message =
          response.response.data.length > 0
            ? response.response.data
            : response.response.data.errors;
        throw new Error(message);
      }

      const newCompany = response.data;
      addCompany(newCompany);
      setMessage("Empresa cadastrada com sucesso!");
      closeModal();
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
      <>
        <div className={style.errorMessage}>{message}</div>
        <div className={style.form}>
          <div className={style.formGroup}>
            <Select
              {...register("clientId", { required: "Selecione um cliente" })}
              label="Cliente"
              error={errors.clientId?.message}>
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
                minLength: {
                  value: 3,
                  message: "Digite mais de 3 caracteres",
                },
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
            />

            <Input
              {...register("mainActivity", { required: "Campo obrigatório" })}
              label="Atividade"
              placeholder="Insira o ramo de atividade"
              error={errors.cnae?.message}
            />
          </div>
          <div className={style.formGroup}>
            <Input
              {...register("cnae", {
                required: "Campo obrigatório",
                valueAsNumber: true,
              })}
              label="CNAE"
              type="text"
              placeholder="Insira o código CNAE"
              error={errors.cnae?.message}
            />
            <Input
              {...register("secondaryCnae", { valueAsNumber: true })}
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
                maxLength: {
                  value: 11,
                  message: "O número deve ter no máximo 11 dígitos",
                },
                minLength: {
                  value: 8,
                  message: "O número deve ter no mínimo 8 dígitos",
                },
                pattern: {
                  value: /^[0-9]{8,11}$/,
                  message:
                    "Digite apenas números válidos (DDD + numero ou numero)",
                },
              })}
              type="text"
              label="Telefone"
              placeholder="Insira o número de telefone"
              error={errors.phone?.message}
            />
            <Input
              {...register("cellphone", {
                required: "Campo obrigatório",
                maxLength: {
                  value: 11,
                  message: "O número de celular deve ter no máximo 11 dígitos",
                },
                minLength: {
                  value: 11,
                  message: "O número de celular deve ter exatamente 11 dígitos",
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Digite apenas números válidos com 11 dígitos",
                },
              })}
              type="text"
              label="Celular"
              placeholder="Insira o número de celular"
              error={errors.cellphone?.message}
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
            <Button
              variant={"confirm"}
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <Button variant={"cancel"} onClick={() => reset()}>
              Cancelar
            </Button>
          </div>
        </div>
      </>
      {isSubmitting ? <Loading /> : null}
    </>
  );
};
