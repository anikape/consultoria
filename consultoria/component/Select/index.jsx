import { forwardRef } from "react";
import { useData } from "../../src/hooks/useData";

import style from "./Select.module.css";

export const Select = forwardRef(
  ({ label = "", name = "", data, onChange, onBlur, ...props }, ref) => {
    const [clients, loading, error] = useData({
      method: "GET",
      url: "client",
      withCrendentials: true,
    });

    return (
      <>
        <div className={style.inputGroup}>
          <label className={style.label} htmlFor={name}>
            {label}:
          </label>
          <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="">Select...</option>
            {clients?.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {loading ? "carregando..." : name}
              </option>
            ))}
          </select>
        </div>
        {/* <select name={name} ref={ref}>
          {props.data?.map((item) => (
            <option value="20">{item}</option>
          ))}
          <option value="20">20</option>
          <option value="30">30</option>
        </select> */}
      </>
    );
  }
);
