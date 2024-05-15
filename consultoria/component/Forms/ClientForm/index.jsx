import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../src/hooks/useFetch";
import LoadingSpinner from "../../LoadingSpinner";
import { Input } from "../../Input";
import { useModal } from "../../Modal/ModalContext";
import style from "./ClientForm.module.css";

export const ClientForm = ({ handleFormSubmit }) => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const { postData } = useFetch();

  const onSubmit = async (data) => {
    try {
      const { response, status } = await postData("client", data);

      if (status !== 201) {
        setMessage(response.data);
        throw new Error(response.data);
      }

      setMessage("Cliente cadastrado com sucesso!");
      handleFormSubmit();
      closeModal();
    } catch ({ message }) {
      setMessage(message);
    }
  };

  return (
    <>
      <div>{message}</div>

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
              <button
                className={style.button1}
                type="submit"
                disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
              <button className={style.button2} type="reset" onClick={reset}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};
