import style from "@/components/Button/Button.module.css";

import PropTypes from "prop-types";

const Button = ({ children, variant, onClick, ...props }) => {
  return (
    <button
      className={`${style.button} ${
        variant === "confirm"
          ? `${style.buttonConfirm}`
          : `${style.buttonCancel}`
      }`}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["confirm", "cancel"]).isRequired,
};

export { Button };
