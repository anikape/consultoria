// import { ButtonModal } from "./ButtonModal";
// import { HiMiniUserPlus } from "react-icons/hi2";
import style from "./Modal.module.css";
import { useModal } from "./ModalContext";

export const ModalContent = ({ children, label }) => {
  const { modalRef, closeModal } = useModal();

  return (
    <>
      <div className={style.modalContainer} ref={modalRef}>
        <h3 className={style.h3}>{label}</h3>
        <button className={style.modalClose} onClick={closeModal} />
        {children}
      </div>
    </>
  );
};
