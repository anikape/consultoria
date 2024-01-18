import { FormProvider, set, useForm } from "react-hook-form";
import { useState } from "react";
import style from "./CompanyForm.module.css";
import { Input } from "../../Input";
import { Select } from "../../Select";
import { useData } from "../../../src/hooks/useData";
import { useFetch } from "../../../src/hooks/useFetch";
import { Loading } from "../../Loading";

export const CompanyForm = () => {
  const [submintLoading, setIsSubmitingLoading] = useState(false);
  const methods = useForm();
  const { postData } = useFetch();

  const [clients, loading, error] = useData({
    methods: "GET",
    url: "clients",
    withCredentials: true,
  });

  const { control } = methods;

  const onSubmit = async (data) => {
    setIsSubmitingLoading(true);
    const { cnae, ...values } = data;
    const body = {
      cnae: parseInt(cnae),
      ...values,
    };
    // parseInt(cnae);
    // const body = { ...values, cnae };
    postData("company", body);
    console.log(typeof body.cnae);
    console.log(body);
    setIsSubmitingLoading(false);
  };

  return (
    <FormProvider {...methods}>
      {submintLoading ? (
        <Loading />
      ) : (
        <div className={style.form}>
          <div className={style.formGroup}>
            <Select name="clienteId" label="Cliente" data={clients} />
            <Input
              control={control}
              name="companyName"
              label="Nome fantasia"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="cnpj"
              label="CNPJ"
              placeholder="Insira o nome fantasia"
            />
            <Input
              control={control}
              name="mainActivity"
              label="Atividade"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="cnae"
              label="CNAE"
              type="number"
              placeholder="Insira o nome fantasia"
            />
            <Input
              control={control}
              name="secondaryCnae"
              label="CNAE Secundário"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="email"
              label="Email"
              placeholder="Insira o nome fantasia"
            />

            <Input
              control={control}
              name="phone"
              label="Telefone"
              placeholder="Insira o nome fantasia"
            />
            <Input
              control={control}
              name="celphone"
              label="Celular"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="zipcode"
              label="CEP"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="state"
              label="Estado"
              placeholder="Insira o nome fantasia"
            />
            <Input
              control={control}
              name="city"
              label="Cidade"
              placeholder="Insira o nome fantasia"
            />
            <Input
              control={control}
              name="address"
              label="Endereço"
              placeholder="Insira o nome fantasia"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              control={control}
              name="comnents"
              label="Comentários"
              placeholder="Insira o nome fantasia"
            />
          </div>

          <button
            className={style.button}
            onClick={methods.handleSubmit(onSubmit)}>
            Cadastrar
          </button>
        </div>
      )}
    </FormProvider>
  );
};
