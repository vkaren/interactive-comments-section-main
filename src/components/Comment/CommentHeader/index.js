import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "context";
import styles from "./styles.module.css";

const CommentHeader = ({ user, createdAt }) => {
  const { currentUser } = useContext(AppContext);

  return (
    <header className={styles["comment_header"]}>
      <div className={styles["comment_profile-photo"]}>
        <Image src={user.image.png} width={25} height={25} />
      </div>

      <span className={styles["comment_username"]}>{user.username}</span>

      {currentUser.username === user.username && (
        <span className={styles["comment_current-user"]}>you</span>
      )}

      <span className={styles["comment_time"]}>{createdAt}</span>
    </header>
  );
};

export default CommentHeader;
