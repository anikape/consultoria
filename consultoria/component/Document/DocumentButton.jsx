import { useModal } from "../Modal/ModalContext";
import style from "./Document.module.css";

export const DocumentButton = ({ icon, action, callback = null }) => {
  const { setIsOpen } = useModal();

  const handle = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    custom: () => callback(),
  };

  return (
    <button className={style.buttons} onClick={handle[action]} type="button">
      {icon}
    </button>
  );
};
