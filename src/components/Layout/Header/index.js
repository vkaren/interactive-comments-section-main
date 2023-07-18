import React from "react";
import Image from "next/image";
import headerIcon from "@icons/favicon-32x32.png";
import logoutIcon from "@icons/icon-logout.png";
import styles from "./styles.module.css";

const Header = ({ isOnCommentsPage, logOut, canAccess }) => (
  <header
    className={`${styles.header}  ${isOnCommentsPage && styles.comments_page}
    ${!canAccess && styles["access_denied"]}`}
  >
    <div className={styles["header_logo"]}>
      <Image src={headerIcon} alt="Logo" width={50} height={50} />
    </div>

    {isOnCommentsPage && canAccess && (
      <button className={styles["comments_page__logout-btn"]} onClick={logOut}>
        <Image src={logoutIcon} alt="Log out icon" width={18} height={18} />
        <span className={styles["logout-btn_text"]}>Log out</span>
      </button>
    )}
  </header>
);

export default Header;
