import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const ModalBackdrop = (props) => {
  return <div className={styles.backdrop}></div>;
};

const ModalContent = (props) => {
  return (
    <div className={styles["modal"]}>
      <div className={styles["content"]}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<ModalBackdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalContent>{props.children}</ModalContent>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
