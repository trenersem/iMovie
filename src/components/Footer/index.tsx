import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import bg from "../../assets/footer-bg.jpeg";
import logo from "../../assets/imovie.png";

const Footer = () => {
  return (
    <div className={styles.footer} style={{ backgroundImage: `url(${bg})` }}>
      <div className={`${styles.content} container`}>
        <div className={styles.content__logo}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
            <Link to="/">iMovies</Link>
          </div>
        </div>
        <div className={styles.content__menus}>
          <div className={styles.content__menu}>
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className={styles.content__menu}>
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className={styles.content__menu}>
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
            <Link to="/">Top 100</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
