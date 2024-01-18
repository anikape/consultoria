import { useFormContext } from "react-hook-form";
import { useData } from "../../src/hooks/useData";

import style from "./Select.module.css";

export const Select = (props) => {
  const { register } = useFormContext();

  const [clients, loading, error] = useData({
    method: "GET",
    url: "client",
    withCrendentials: true,
  });

  return (
    <div className={style.inputGroup}>
      <label className={style.label} htmlFor={props.name}>
        {props.label}:
      </label>
      <select {...register(`${props.name}`)}>
        <option value="">Select...</option>
        {clients?.map((item) => (
          <option key={item._id} value={item._id}>
            {loading ? "carregando..." : item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
