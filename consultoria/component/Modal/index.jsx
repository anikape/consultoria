import style from "./Modal.module.css";

export const Modal = ({ children, isOpen, setIsOpen, id = "modal" }) => {
  if (!isOpen) {
    return null;
  }

  console.log("render modal");

  const handleBackdropClick = (e) => {
    e.preventDefault();
    if (e.target.id !== id) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      <div id={id} className={style.backdrop} onClick={handleBackdropClick}>
        <div className={style.modalContainer}>
          <h3 className={style.h3}>Cadastro</h3>
          <button
            type="button"
            className={style.modalClose}
            onClick={() => setIsOpen(false)}
          />
          {children}
        </div>
      </div>
    </>
  );
};
