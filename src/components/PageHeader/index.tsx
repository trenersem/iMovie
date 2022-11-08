import React, { ReactNode } from "react";

import styles from "./index.module.scss";

import bg from "../../assets/footer-bg.jpeg";

type Props = {
  children: ReactNode;
};

const PageHeader = ({ children }: Props) => {
  return (
    <div className={styles.header} style={{ backgroundImage: `url(${bg})` }}>
      <h2>{children}</h2>
    </div>
  );
};

export default PageHeader;
