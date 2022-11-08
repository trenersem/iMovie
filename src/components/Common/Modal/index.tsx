import React from "react";
import Modal from "react-modal";
import styles from "./index.module.scss";

Modal.setAppElement("#root");

interface Props {
  children?: any;
  isOpen: boolean;
  onClose?: any;
  onRequestClose?: any;
  onAfterOpen?: any;
}

const MyModal = ({ children, isOpen, onClose, onAfterOpen }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={1000}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      portalClassName={`${styles.modal} ${!isOpen ? styles.modal_close : ""}`}
      overlayClassName={styles.modal__overlay}
      className={`${styles.modal__content} ${
        !isOpen ? styles.modal__content_close : ""
      }`}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
