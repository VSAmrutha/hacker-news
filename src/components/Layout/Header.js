import React from "react";
import Logo from "../../assets/logotext.jpg";
import styles from "./Layout.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.headerImage} src={Logo} alt="hacker-news" />
    </header>
  );
};
export default Header;
