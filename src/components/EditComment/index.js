import { createRef, useContext } from "react";
import { AppContext } from "context";
import styles from "./styles.module.css";

const EditComment = ({ content, commentToEdit, editContent }) => {
  const { searchAndUpdateComment } = useContext(AppContext);
  const formRef = createRef();

  const onEditComment = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const newContent = formData.get("new_content");

      editContent(newContent);

      // Save in localstorage
      searchAndUpdateComment({
        commentId: commentToEdit.id,
        propertyToUpdate: "content",
        newValue: newContent,
      });

      commentToEdit.hideEditState();
    }
  };

  return (
    <form ref={formRef} className={styles["comment_edit-form"]}>
      <textarea
        className={styles["comment_edit-textarea"]}
        name="new_content"
        defaultValue={content}
        onKeyDown={onEditComment}
      ></textarea>

      <button
        className={styles["comment_update-btn"]}
        onClick={onEditComment}
        aria-label="Update comment"
      >
        UPDATE
      </button>
    </form>
  );
};

export default EditComment;
