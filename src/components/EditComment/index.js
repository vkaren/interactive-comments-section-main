import React, { useContext } from "react";
import { AppContext } from "context";
import styles from "./styles.module.css";

const EditComment = ({ content, commentToEdit }) => {
  const { preventDefaultBehaviourEnter, onWritingComment, onEditComment } =
    useContext(AppContext);

  const newCommentData = {
    type: "edit",
    commentToEdit,
  };

  return (
    <>
      <textarea
        className={styles["comment_edit-textarea"]}
        defaultValue={content}
        onKeyDown={preventDefaultBehaviourEnter}
        onKeyUp={onWritingComment(newCommentData)}
      ></textarea>

      <button
        className={styles["comment_update-btn"]}
        onClick={() => onEditComment(newCommentData)}
      >
        UPDATE
      </button>
    </>
  );
};

export default EditComment;
