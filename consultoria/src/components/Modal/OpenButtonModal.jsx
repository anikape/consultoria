import { useModal } from "@/components/Modal/ModalContext";
import style from "@/components/Modal/Modal.module.css";

export const OpenButtonModal = ({ children }) => {
  const { openModal } = useModal();
  return (
    <button type="button" className={style.buttonModalIcon} onClick={openModal}>
      {children}
    </button>
  );
};
