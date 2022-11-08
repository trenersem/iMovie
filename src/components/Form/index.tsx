import { useState } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";
import styles from "./index.module.scss";

interface Props {
  title: string;
  handleClick: any;
}
const Form = ({ title, handleClick }: Props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className={styles.form}>
      <Input
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="email"
      />
      <Input
        type="password"
        value={pass}
        onChange={setPass}
        placeholder="password"
      />

      <Button onClick={() => handleClick(email, pass)}>{title}</Button>
    </div>
  );
};

export { Form };
