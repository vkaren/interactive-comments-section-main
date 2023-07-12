import React from "react";
import Image from "next/image";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import ReplyIcon from "@icons/icon-reply.svg";
import DeleteIcon from "@icons/icon-delete.svg";
import EditIcon from "@icons/icon-edit.svg";
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
          <DeleteIcon />
          <span>Delete</span>
        </button>
        <button className={styles["comment_edit-btn"]}>
          <EditIcon />
          <span>Edit</span>
        </button>
      </>
    ) : (
      <button className={styles["comment_reply-btn"]}>
        <ReplyIcon />
        <span>Reply</span>
      </button>
    )}

    <div className={styles["comment_like"]}>
      <button className={styles["comment_like-up"]}>
        <PlusIcon />
      </button>

      <span className={styles["comment_likes"]}>{score}</span>

      <button className={styles["comment_like-down"]}>
        <MinusIcon />
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
