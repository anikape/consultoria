// import { ButtonModal } from "./ButtonModal";
// import { HiMiniUserPlus } from "react-icons/hi2";
// import style from "@/Modal.module.css";
import style from "@/components/Modal/Modal.module.css";
import { useModal } from "@/components/Modal/ModalContext";

export const ModalBody = ({ children, label }) => {
  const { handleOutsideClick, isOpen } = useModal();
  // const modalRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const handleOutsideClick = (e) => {
  //   if (modalRef.current && !modalRef.current.contains(e.target)) {
  //     closeModal();
  //   }
  // };

  return (
    <>
      {/* <ButtonModal>
        <HiMiniUserPlus /> {label ?? "Adicionar"}
      </ButtonModal> */}
      {isOpen && (
        <div className={style.backdrop} onClick={handleOutsideClick}>
          {children}
          {/* <div className={style.modalContainer} ref={modalRef}>
            <h3 className={style.h3}>{label}</h3>
            <button className={style.modalClose} onClick={closeModal} />
            {children}
          </div> */}
        </div>
      )}
    </>
  );
};
