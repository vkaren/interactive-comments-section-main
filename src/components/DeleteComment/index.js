import React from "react";
import styles from "./styles.module.css";

const DeleteComment = ({ onDeleteComment, onCancelDeleteComment }) => {
  return (
    <>
      <section className={styles["delete-comment_section"]}>
        <h2>Delete Comment</h2>
        <p>
          Are you sure do you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className={styles["delete-comment_options"]}>
          <button
            className={styles["delete-comment_cancel-btn"]}
            onClick={onCancelDeleteComment}
          >
            NO, CANCEL
          </button>
          <button
            className={styles["delete-comment_accept-btn"]}
            onClick={onDeleteComment}
          >
            YES, DELETE
          </button>
        </div>
      </section>
      <div
        className={styles["delete-comment_overlay"]}
        onClick={onCancelDeleteComment}
      ></div>
    </>
  );
};

export default DeleteComment;
