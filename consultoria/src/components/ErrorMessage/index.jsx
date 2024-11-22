// ErrorComponent.js
import style from "@components/ErrorMessage/ErrorComponent.module.css";

const ErrorMessage = ({ message }) => {
  return <span className={style.error}>{message}</span>;
};

// ErrorComponent.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default ErrorMessage;
