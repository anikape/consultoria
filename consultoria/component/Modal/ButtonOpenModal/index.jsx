import style from "./ButtonOpenModal.module.css";
import mais from "../../../src/assets/mais.png";

export const ButtonOpenModal = ({ label, openModal, setOpenModal }) => {
  return (
    <>
      <button
        className={style.buttonModal}
        onClick={() => setOpenModal(!openModal)}>
        <img src={mais} alt="simbolo de mais" />
        {label}
      </button>
    </>
  );
};
