import React, { ReactNode } from "react";
import styles from "./index.module.scss";

interface Props {
  onClick?: () => void;
  children: ReactNode | string;
  className?: string;
  small?: boolean;
}

const Button = ({ onClick, children, className, small }: Props) => {
  return (
    <button
      className={`${styles.btn} ${className} ${small ? styles.small : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({ onClick, children, className }: Props) => {
  return (
    <Button className={`${styles.btn_outline} ${className}`} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Button;
