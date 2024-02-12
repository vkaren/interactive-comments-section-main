import { useContext } from "react";
import { AppContext } from "context";
import CommentContainer from "@components/CommentContainer";
import styles from "./styles.module.css";

const CommentThread = () => {
  const { comments } = useContext(AppContext);

  return (
    <section className={styles["comments_section"]}>
      {comments.map((comment) => (
        <CommentContainer key={comment.id} {...comment} />
      ))}
    </section>
  );
};

export default CommentThread;
