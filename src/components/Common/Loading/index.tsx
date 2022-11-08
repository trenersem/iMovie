import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Loading = () => <div className={styles.loading}>Loading...</div>;

export default Loading;
