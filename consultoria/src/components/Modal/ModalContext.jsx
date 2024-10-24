import { useRef, useState, createContext, useContext } from "react";

export const ModalContext = createContext(null);
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
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
    <ModalContext.Provider
      value={{
        isOpen,
        modalRef,
        setIsOpen,
        closeModal,
        handleOutsideClick,
        openModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
