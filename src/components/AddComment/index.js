import { createRef, useContext } from "react";
import { AppContext } from "context";
import { deepCopyList } from "@utils/deepCopyList";
import Image from "next/image";
import styles from "./styles.module.css";

const AddComment = ({ replyComment = null }) => {
  const { currentUser, comments, lastCommentId, updateComments } =
    useContext(AppContext);

  const formRef = createRef();

  const onAddCommentOrReply = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      const commentContent = formData.get("comment_content");
      const textarea = formRef.current[0];

      replyComment ? addReply(commentContent) : addComment(commentContent);

      textarea.value = "";
    }
  };

  const addComment = (content) => {
    const commentToAdd = {
      id: lastCommentId + 1,
      content,
      createdAt: Date.now(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    const newComments = [...comments, commentToAdd];

    updateComments({ comments: newComments, lastCommentId: commentToAdd.id });
  };

  const addReply = (content) => {
    const replyToAdd = {
      id: lastCommentId + 1,
      content,
      createdAt: Date.now(),
      score: 0,
      user: currentUser,
      replyingTo: replyComment.replyingTo,
    };

    const commentsCopy = deepCopyList(comments);

    for (let i = 0; i < commentsCopy.length; i++) {
      const comment = commentsCopy[i];

      if (comment.id == replyComment.replyingToCommentId) {
        comment.replies.push(replyToAdd);
        break;
      }
    }

    updateComments({ comments: commentsCopy, lastCommentId: replyToAdd.id });
    replyComment.hideReplyState();
  };

  return (
    <form
      ref={formRef}
      className={`${styles["add-comment_section"]} ${
        replyComment && styles["add-comment_reply_section"]
      }`}
    >
      <div className={styles["add-comment_profile-photo"]}>
        <Image
          src={currentUser.image.png}
          alt="User avatar"
          width={25}
          height={25}
        />
      </div>

      <textarea
        name="comment_content"
        className={styles["add-comment_textarea"]}
        placeholder="Add a comment..."
        onKeyDown={onAddCommentOrReply}
      ></textarea>

      <button
        className={styles["add-comment_send-btn"]}
        onClick={onAddCommentOrReply}
        aria-label={`Send ${replyComment ? "reply" : "comment"}`}
      >
        {replyComment ? "REPLY" : "SEND"}
      </button>
    </form>
  );
};

export default AddComment;
