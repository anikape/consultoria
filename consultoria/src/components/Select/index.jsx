import { forwardRef } from "react";

import style from "@/components/Select/Select.module.css";

const Select = forwardRef(
  ({ label = "", name = "", error, onChange, onBlur, children }, ref) => {
    return (
      <>
        <div className={style.inputGroup}>
          <label className={style.label} htmlFor={name}>
            {label ? `${label} :` : ""}
          </label>
          <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            {children}
          </select>
          <p className={style.errorMessage}>{error}</p>
        </div>
      </>
    );
  }
);

export { Select };
