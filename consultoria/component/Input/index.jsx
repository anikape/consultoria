import { useFormContext } from "react-hook-form";
import style from "./Input.module.css";

export const Input = (props) => {
  const { register } = useFormContext();

  return (
    <>
      <div className={style.inputGroup}>
        <label className={style.label} htmlFor={props.name}>
          {props.label}:
        </label>
        <input
          {...register(`${props.name}`)}
          placeholder={props.placeholder}
          className={style.input}
        />
      </div>
    </>
  );
};

// export const Input = forwardRef(({ name, type, ...rest }, ref) => {
//   const { register } = useFormContext();
//   return (
//     <>
//       <div className={style.inputGroup}>
//         <label className={style.label} htmlFor="email">
//           {/* E-mail: */}
//           {/* {props.name} */}
//         </label>
//         <input
//           {...rest}
//           name={name}
//           type={type}
//           ref={ref}
//           {...register("email")}
//           // value={""}
//           // placeholder={props.placeholder}
//           // placeholder="Infome E-mail"
//           // className={style.input}
//           // id={props.name}
//           // required
//         />
//         {/* {fieldState.invalid && <p>Inválido</p>} */}
//       </div>
//     </>
//   );
// });
