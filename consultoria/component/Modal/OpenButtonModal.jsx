import { useModal } from "./ModalContext";
import style from "./Modal.module.css";

export const OpenButtonModal = ({ children }) => {
  const { openModal } = useModal();
  return (
    <button type="button" className={style.buttonModal} onClick={openModal}>
      {children}
    </button>
  );
};
