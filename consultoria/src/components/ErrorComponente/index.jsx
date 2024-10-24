// ErrorComponent.js

import React from "react";
import PropTypes from "prop-types";
import style from "@/components/ErrorComponente/ErrorComponent.module.css";

const ErrorComponent = ({ message }) => {
  return <span className={style.error}>{message}</span>;
};

// ErrorComponent.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default ErrorComponent;
