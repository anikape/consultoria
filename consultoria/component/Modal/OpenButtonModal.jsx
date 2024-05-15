import { useModal } from "./ModalContext";
import style from "./Modal.module.css";

export const OpenButtonModal = ({ children }) => {
  const { openModal } = useModal();
  return (
    <button type="button" className={style.buttonModal} onClick={openModal}>
      {/* <button type="button" className={style.buttonModal}> */}
      {children}
      {/* {children} */}
    </button>
  );
};
{
  /* <button type="button" className={style.buttonModal} onClick={openModal}>
  <HiMiniUserPlus /> {label ?? "Adicionar"}
</button>; */
}
