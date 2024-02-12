import { useContext } from "react";
import { AppContext } from "context";
import ReplyIcon from "@icons/icon-reply.svg";
import DeleteIcon from "@icons/icon-delete.svg";
import EditIcon from "@icons/icon-edit.svg";
import styles from "./styles.module.css";

const CommentButtons = ({ id, user, toggleReplyState, toggleEditState }) => {
  const { currentUser, onClickDelete } = useContext(AppContext);

  return currentUser.username === user.username ? (
    <>
      <button
        className={styles["comment_delete-btn"]}
        onClick={() => onClickDelete(id)}
        aria-label="Delete comment"
      >
        <DeleteIcon />
        <span>Delete</span>
      </button>
      <button
        className={styles["comment_edit-btn"]}
        onClick={toggleEditState}
        aria-label="Edit comment"
      >
        <EditIcon />
        <span>Edit</span>
      </button>
    </>
  ) : (
    <button
      className={styles["comment_reply-btn"]}
      onClick={toggleReplyState}
      aria-label="Reply comment"
    >
      <ReplyIcon />
      <span>Reply</span>
    </button>
  );
};

export default CommentButtons;
