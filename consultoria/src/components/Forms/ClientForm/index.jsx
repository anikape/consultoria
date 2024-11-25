import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { useModal } from "@/components/Modal/ModalContext";
import { useClient } from "@hooks/useClient";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/Input";

import style from "@/components/Forms/ClientForm/ClientForm.module.css";
import { Button } from "@/components/Button";

export const ClientForm = () => {
  const { addClient } = useClient();
  const { closeModal } = useModal();
  const { postData } = useFetch();
  const [message, setMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  const onSubmit = async data => {
    try {
      const response = await postData("client", data);

      if (response.status !== 201) {
        setMessage(response.response.data);
        throw new Error(response.response.data);
      }

      const newClient = response.data;
      addClient(newClient);
      setMessage("Cliente cadastrado com sucesso!");

      closeModal();
    } catch ({ message }) {
      setMessage(message);
    }
  };

  return (
    <>
      <div className={style.errorMessage}>{message}</div>

      <form className={style.formContent} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "Campo obrigatório",
            minLength: { value: 3, message: "Digite ao menos 3 caracteres" },
          })}
          label="Nome"
          placeholder="Nome Completo"
          error={errors.name?.message}
        />
        <Input
          {...register("cpf", {
            required: "Campo obrigatório",
            maxLength: { value: 11, message: "Digite apenas numeros" },
            pattern: {
              value: /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/,
              message: "Digite apenas números",
            },
          })}
          label="CPF:"
          placeholder="CPF"
          error={errors.cpf?.message}
          maxLength={11}
        />
        <Input
          {...register("email", {
            required: "Campo obrigarório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Digite um email válido",
            },
          })}
          label="Email"
          placeholder="E-mail"
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
          label="Telefone:"
          placeholder="Telefone"
          maxLength={11}
          error={errors.phone?.message}
        />
        <div className={style.buttons}>
          {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button variant={"confirm"} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
              <Button variant={"cancel"} onClick={() => reset()}>
                Limpar
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
};
