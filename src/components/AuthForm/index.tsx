import React, { ReactNode } from "react";
import styles from "./index.module.scss";

interface Props {
  children: ReactNode;
}
const AuthForm = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.login}>{children}</div>
      </div>
    </div>
  );
};

export default AuthForm;
