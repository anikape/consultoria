import React, { useRef, useState } from "react";
import mais from "../../src/assets/mais.png";
import style from "./Modal.module.css";

export const Modal = ({ children, label }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <>
      <div>
        <button type="button" className={style.buttonModal} onClick={openModal}>
          <img src={mais} alt="simbolo de mais" /> {label ?? "Adicionar"}
        </button>
        {isOpen && (
          <div className={style.backdrop} onClick={handleOutsideClick}>
            <div className={style.modalContainer} ref={modalRef}>
              <button className={style.modalClose} onClick={closeModal} />
              {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
