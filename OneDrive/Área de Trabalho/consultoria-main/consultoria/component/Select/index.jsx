import { forwardRef } from "react";

import style from "./Select.module.css";

export const Select = forwardRef(
  ({ label = "", name = "", data, onChange, onBlur }, ref) => {
    return (
      <>
        <div className={style.inputGroup}>
          <label className={style.label} htmlFor={name}>
            {label}:
          </label>
          <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="">Selecione uma opção...</option>
            {data?.map(({ id, name }) => (
              <option key={id} value={id} disabled={data ? "" : "disabled"}>
                {data ? name : "carregando..."}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
);
