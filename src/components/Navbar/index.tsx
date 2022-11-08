import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useAuth } from "../../hooks/use-auth";
import logo from "../../assets/imovie.png";
import { removeUser } from "../../store/slices/userSlice";
import { headerNav } from "./constants";
import { useAppDispatch } from "../../store/hooks";
import * as Toaster from "../Toaster";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const headerRef = useRef<HTMLInputElement>(null);

  const active = headerNav.findIndex((e) => e.path === pathname);
  const { isAuth } = useAuth();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current?.classList.add(styles.shrink);
      } else {
        headerRef?.current?.classList.remove(styles.shrink);
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const logOutHandler = () => {
    dispatch(removeUser());
    Toaster.showSuccessToast("You have successfully logged in");
  };

  return (
    <div ref={headerRef} className={styles.header}>
      <div className={`${styles.header__wrap} container`}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
          <Link to="/">iMovies</Link>
        </div>
        <ul className={styles.header__nav}>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? styles.active : ""}`}>
              <Link to={e.path}>
                {headerNav.length - 1 === i && isAuth ? (
                  <span onClick={logOutHandler}>Log out</span>
                ) : (
                  e.display
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
