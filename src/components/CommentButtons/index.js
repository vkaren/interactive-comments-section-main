import React from "react";
import ReplyIcon from "@icons/icon-reply.svg";
import DeleteIcon from "@icons/icon-delete.svg";
import EditIcon from "@icons/icon-edit.svg";
import styles from "./styles.module.css";

const CommentButtons = ({ currentUser, user, onClickReplyBtn }) =>
  currentUser.username === user.username ? (
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
    <button className={styles["comment_reply-btn"]} onClick={onClickReplyBtn}>
      <ReplyIcon />
      <span>Reply</span>
    </button>
  );

export default CommentButtons;
