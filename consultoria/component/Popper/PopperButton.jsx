import { useContext } from "react";
import { PopperContext } from "./PopperBody";
import style from "./Popper.module.css";

export const PopperButton = ({ children }) => {
  const { show, setShow } = useContext(PopperContext);
  return (
    <>
      <div className={style.popper} onClick={() => setShow(!show)}>
        {children}
        <p className={style.popperButton}>{show ? "▲" : "▼"}</p>
      </div>
    </>
  );
};
