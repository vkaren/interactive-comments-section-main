import React from "react";
import Image from "next/image";
import iconPlus from "@icons/icon-plus.svg";
import iconMinus from "@icons/icon-minus.svg";
import iconReply from "@icons/icon-reply.svg";
import iconDelete from "@icons/icon-delete.svg";
import iconEdit from "@icons/icon-edit.svg";
import styles from "./styles.module.css";

const Comment = ({
  id,
  user,
  currentUser,
  content,
  createdAt,
  score,
  replyingTo,
}) => (
  <div id={id} className={styles["comment"]}>
    <header className={styles["comment_header"]}>
      <div className={styles["comment_profile-photo"]}>
        <Image src={user.image.png} width={25} height={25} />
      </div>
      <span className={styles["comment_username"]}>{user.username}</span>
      {currentUser === user.username && (
        <span className={styles["comment_current-user"]}>you</span>
      )}
      <span className={styles["comment_time"]}>{createdAt}</span>
    </header>

    {currentUser === user.username ? (
      <>
        <button className={styles["comment_delete-btn"]}>
          <Image src={iconDelete} width={10} />
          <span>Delete</span>
        </button>
        <button className={styles["comment_edit-btn"]}>
          <Image src={iconEdit} width={10} />
          <span>Edit</span>
        </button>
      </>
    ) : (
      <button className={styles["comment_reply-btn"]}>
        <Image src={iconReply} width={10} />
        <span>Reply</span>
      </button>
    )}

    <div className={styles["comment_like"]}>
      <button className={styles["comment_like-up"]}>
        <Image src={iconPlus} width={10} />
      </button>
      <span className={styles["comment_likes"]}>{score}</span>
      <button className={styles["comment_like-down"]}>
        <Image src={iconMinus} width={10} />
      </button>
    </div>

    <div className={styles["comment_text"]}>
      <p>
        <span className={styles["comment_text_replyingTo"]}>
          {replyingTo ? `@${replyingTo} ` : ""}
        </span>
        {content}
      </p>
    </div>
  </div>
);

export default Comment;
