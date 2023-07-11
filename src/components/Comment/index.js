import React from "react";
import Image from "next/image";
import iconPlus from "@icons/icon-plus.svg";
import iconMinus from "@icons/icon-minus.svg";
import iconReply from "@icons/icon-reply.svg";
import styles from "./styles.module.css";

import avatar from "@avatars/image-juliusomo.png";

const Comment = () => (
  <article className={styles["comment"]}>
    <header className={styles["comment_header"]}>
      <div className={styles["comment_profile-photo"]}>
        <Image src={avatar} width={25} height={25} />
      </div>
      <span className={styles["comment_username"]}>username</span>
      <span className={styles["comment_time"]}>time ago</span>
    </header>

    <button className={styles["comment_reply-btn"]}>
      <Image src={iconReply} width={10} />
      <span>Reply</span>
    </button>

    <div className={styles["comment_like"]}>
      <button className={styles["comment_like-up"]}>
        <Image src={iconPlus} width={10} />
      </button>
      <span className={styles["comment_likes"]}>0</span>
      <button className={styles["comment_like-down"]}>
        <Image src={iconMinus} width={10} />
      </button>
    </div>

    <div className={styles["comment_text"]}>
      <p>aaaaaaaaaaaaaaaaaaa</p>
    </div>
  </article>
);

export default Comment;
