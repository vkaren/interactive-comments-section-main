import React from "react";
import ReplyIcon from "@icons/icon-reply.svg";
import DeleteIcon from "@icons/icon-delete.svg";
import EditIcon from "@icons/icon-edit.svg";
import styles from "./styles.module.css";

const CommentButtons = ({
  id,
  currentUser,
  user,
  onClickReplyBtn,
  onClickEditBtn,
  onClickDelete,
}) =>
  currentUser.username === user.username ? (
    <>
      <button
        className={styles["comment_delete-btn"]}
        onClick={() => onClickDelete(id)}
      >
        <DeleteIcon />
        <span>Delete</span>
      </button>
      <button className={styles["comment_edit-btn"]} onClick={onClickEditBtn}>
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
