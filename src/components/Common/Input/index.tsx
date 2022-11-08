import React from "react";
import styles from "./index.module.scss";

interface Props {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
}

const Input = ({ type, placeholder, value, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
  );
};

export default Input;
