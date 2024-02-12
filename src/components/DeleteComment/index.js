import { useContext } from "react";
import { AppContext } from "context";
import styles from "./styles.module.css";

const DeleteComment = () => {
  const { onDeleteComment, onCancelDeleteComment } = useContext(AppContext);

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
            aria-label="Cancel delete"
          >
            NO, CANCEL
          </button>
          <button
            className={styles["delete-comment_accept-btn"]}
            onClick={onDeleteComment}
            aria-label="Delete"
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
