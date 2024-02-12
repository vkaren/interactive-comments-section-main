import styles from "./styles.module.css";

const CommentText = ({ replyingTo, content }) => (
  <div className={styles["comment_text"]}>
    <p>
      <span className={styles["comment_text_replyingTo"]}>
        {replyingTo && `@${replyingTo} `}
      </span>
      {content}
    </p>
  </div>
);

export default CommentText;
