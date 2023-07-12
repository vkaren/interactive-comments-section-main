import React from "react";
import Comment from "@components/Comment";
import styles from "./styles.module.css";

const Replies = ({ replies, currentUser }) => (
  <section className={styles["replies_section"]}>
    {replies.map((reply) => (
      <Comment
        key={reply.id}
        id={reply.id}
        user={reply.user}
        currentUser={currentUser}
        content={reply.content}
        createdAt={reply.createdAt}
        score={reply.score}
        replyingTo={reply.replyingTo}
      />
    ))}
  </section>
);

export default Replies;
