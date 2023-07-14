import React from "react";
import styles from "./styles.module.css";

const EditComment = ({
  content,
  commentToEdit,
  onWritingComment,
  onEditComment,
}) => {
  const preventDefaultBehaviourEnter = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <>
      <textarea
        className={styles["comment_edit-textarea"]}
        defaultValue={content}
        onKeyDown={preventDefaultBehaviourEnter}
        onKeyUp={onWritingComment({ commentToEdit })}
      ></textarea>

      <button
        className={styles["comment_update-btn"]}
        onClick={() => onEditComment(commentToEdit)}
      >
        UPDATE
      </button>
    </>
  );
};

export default EditComment;
