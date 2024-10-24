import style from "@/components/Modal/Modal.module.css";
import { useModal } from "@/components/Modal/ModalContext";

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
