import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
const Button = ({ children, className, ...others }) => {
  //   let style = className ? className : null;
  return (
    <button className={className? className:styles.orangeButton} {...others}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Button.defaultProps = {
  children: null,
  className: null,
};
export default Button;
