import { useModal } from "@components/Modal/ModalContext";
import style from "@components/Modal/Modal.module.css";

export const ButtonModal = ({
  icon = null,
  title = "",
  action,
  callback = null,
}) => {
  const { setIsOpen } = useModal();

  const handle = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    custom: () => callback(),
  };

  return (
    <>
      {icon ? (
        <button
          className={style.buttonModalIcon}
          onClick={handle[action]}
          type="button">
          {icon}
        </button>
      ) : (
        <button
          className={style.buttonModal}
          onClick={handle[action]}
          type="button">
          {title}
        </button>
      )}
    </>
  );
};
