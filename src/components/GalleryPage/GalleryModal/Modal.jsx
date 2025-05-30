import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const isModalVissible = props.isModalVissible;
  const setIsModalVissible = props.setIsModalVissible;
  const src = props.target?.src;

  return (
    <div
      role="button"
      aria-label="home button"
      tabIndex={0}
      className={`${styles.container}  ${isModalVissible ? styles.visible : ""}`}
      onClick={() => {
        setIsModalVissible(false);
      }}
      onKeyDown={() => {
        setIsModalVissible(false);
      }}
    >
      <div className={styles.frame}>
        <img src={src} alt="image" />
      </div>
    </div>
  );
};

export default Modal;
