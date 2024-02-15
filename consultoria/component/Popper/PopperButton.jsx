// import { useState } from "react";
import style from "./Popper.module.css";

export const PopperButton = ({ children, show, setShow }) => {
  // const [show, setShow] = useState(false);
  return (
    <>
      <div className={style.popper} onClick={() => setShow(!show)}>
        {children}
        {/* <p>{mask.CNPJ(company.cnpj)}</p> */}
        <p>{show ? "▲" : "▼"}</p>
      </div>
    </>
  );
};
