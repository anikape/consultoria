import style from "./Input.module.css";

import { forwardRef } from "react";

export const Input = forwardRef(
  ({ label = "", type = "text", name = "", ...props }, ref) => {
    return (
      <>
        <div className={style.inputGroup}>
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
          <input type={type} name={name} {...props} ref={ref} />
        </div>
      </>
    );
  }
);
