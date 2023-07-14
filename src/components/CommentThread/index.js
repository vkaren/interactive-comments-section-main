import React from "react";
import CommentContainer from "@components/CommentContainer";
import styles from "./styles.module.css";

const CommentThread = ({
  currentUser,
  comments,
  onAddReply,
  onWritingComment,
}) => {
  return (
    <section className={styles["comments_section"]}>
      {comments.map((comment) => (
        <CommentContainer
          key={comment.id}
          id={comment.id}
          user={comment.user}
          currentUser={currentUser}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          replies={comment.replies}
          onAddReply={onAddReply}
          onWritingComment={onWritingComment}
        />
      ))}
    </section>
  );
};

export default CommentThread;
