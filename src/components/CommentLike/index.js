import React from "react";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import styles from "./styles.module.css";

const CommentLike = ({ score }) => (
  <div className={styles["comment_like"]}>
    <button className={styles["comment_like-up"]}>
      <PlusIcon />
    </button>

    <span className={styles["comment_likes"]}>{score}</span>

    <button className={styles["comment_like-down"]}>
      <MinusIcon />
    </button>
  </div>
);

export default CommentLike;
