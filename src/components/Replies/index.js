import Comment from "@components/Comment";
import styles from "./styles.module.css";

const Replies = ({ replyingToCommentId, replies }) => (
  <section className={styles["replies_section"]}>
    {replies.map((reply) => (
      <Comment
        key={reply.id}
        id={reply.id}
        user={reply.user}
        content={reply.content}
        createdAt={reply.createdAt}
        score={reply.score}
        replyingTo={reply.replyingTo}
        replyingToCommentId={replyingToCommentId}
      />
    ))}
  </section>
);

export default Replies;
