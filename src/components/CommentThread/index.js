import React, { useContext } from "react";
import CommentContainer from "@components/CommentContainer";
import { AppContext } from "context";
import styles from "./styles.module.css";

const CommentThread = () => {
  const { comments } = useContext(AppContext);

  return (
    <section className={styles["comments_section"]}>
      {comments.map((comment) => (
        <CommentContainer
          key={comment.id}
          id={comment.id}
          user={comment.user}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          replies={comment.replies}
        />
      ))}
    </section>
  );
};

export default CommentThread;
