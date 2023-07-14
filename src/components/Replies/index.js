import React from "react";
import Comment from "@components/Comment";
import styles from "./styles.module.css";

const Replies = ({
  currentUser,
  replyingToCommentId,
  replies,
  onAddReply,
  onWritingComment,
}) => (
  <section className={styles["replies_section"]}>
    {replies.map((reply) => (
      <Comment
        key={reply.id}
        id={reply.id}
        replyingToCommentId={replyingToCommentId}
        user={reply.user}
        currentUser={currentUser}
        content={reply.content}
        createdAt={reply.createdAt}
        score={reply.score}
        replyingTo={reply.replyingTo}
        onAddReply={onAddReply}
        onWritingComment={onWritingComment}
      />
    ))}
  </section>
);

export default Replies;
