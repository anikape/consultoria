import style from "@/components/Input/Input.module.css";

import { forwardRef } from "react";

export const Input = forwardRef(
  ({ label = "", type = "text", name = "", error, ...props }, ref) => {
    return (
      <>
        <div className={style.inputGroup}>
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
          <input type={type} name={name} {...props} ref={ref} />
          <p className={style.errorMessage}>{error}</p>
        </div>
      </>
    );
  }
);
