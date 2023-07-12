import React from "react";
import Comment from "@components/Comment";
import Replies from "@components/Replies";
import styles from "./styles.module.css";

const CommentContainer = ({
  id,
  user,
  currentUser,
  content,
  createdAt,
  score,
  replies,
}) => (
  <article className={styles["comment__container"]}>
    <Comment
      id={id}
      user={user}
      currentUser={currentUser}
      content={content}
      createdAt={createdAt}
      score={score}
    />
    <Replies currentUser={currentUser} replies={replies} />
  </article>
);

export default CommentContainer;
