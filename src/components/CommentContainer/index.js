import Comment from "@components/Comment";
import Replies from "@components/Replies";
import styles from "./styles.module.css";

const CommentContainer = ({ id, user, content, createdAt, score, replies }) => (
  <article className={styles["comment__container"]}>
    <Comment
      id={id}
      user={user}
      content={content}
      createdAt={createdAt}
      score={score}
    />
    <Replies replies={replies} replyingToCommentId={id} />
  </article>
);

export default CommentContainer;
