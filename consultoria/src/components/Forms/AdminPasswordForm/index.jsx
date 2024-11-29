import { Button } from "@/components/Button";
import style from "@/components/Forms/AdminPasswordForm/AdminPasswordForm.module.css";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const AdminPasswordForm = () => {
  const { patchData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const admin = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await patchData(`/admin/${admin.user?.id}`, data);
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.response.data.errors);
      }
      setMessage("Senha alterada com sucesso");
    } catch ({ message }) {
      setMessage(message);
    } finally {
      setLoading(false);
    }
    console.log(data);
  };

  return (
    <div className={style.userData}>
      <h2 className={style.h2}>Alterar senha</h2>
      <div className={style.feedback}>{message && <p>{message}</p>}</div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formItem}>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            disabled={loading}
            {...register("password", {
              required: "Campo obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;,.<>?]).{8,}$/,
                message:
                  "A senha deve ter ao menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
              },
            })}
          />
          <p className={style.errorMessage}>{errors.password?.message}</p>
        </div>

        <div className={style.formItem}>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="********"
            disabled={loading}
            {...register("confirmPassword", {
              required: "Campo obrigatório",
              validate: value =>
                value === password || "As senhas não coincidem",
            })}
          />
          <p className={style.errorMessage}>
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div className={style.buttonGroup}>
          <Button variant={"confirm"} disabled={loading}>
            {loading ? "Alterando..." : "Altera senha"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { AdminPasswordForm };
