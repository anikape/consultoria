import React, { useRef, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
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
      <button type="button" className={style.buttonModal} onClick={openModal}>
        <HiMiniUserPlus /> {label ?? "Adicionar"}
      </button>
      {isOpen && (
        <div className={style.backdrop} onClick={handleOutsideClick}>
          <div className={style.modalContainer} ref={modalRef}>
            <h3 className={style.h3}>{label}</h3>
            <button className={style.modalClose} onClick={closeModal} />
            {children}
          </div>
        </div>
      )}
    </>
  );
};
