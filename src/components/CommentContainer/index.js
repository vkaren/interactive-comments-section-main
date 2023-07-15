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
  onAddReply,
  onWritingComment,
  onEditComment,
  onVoteComment,
}) => (
  <article className={styles["comment__container"]}>
    <Comment
      id={id}
      user={user}
      currentUser={currentUser}
      content={content}
      createdAt={createdAt}
      score={score}
      onAddReply={onAddReply}
      onWritingComment={onWritingComment}
      onEditComment={onEditComment}
      onVoteComment={onVoteComment}
    />
    <Replies
      currentUser={currentUser}
      replyingToCommentId={id}
      replies={replies}
      onAddReply={onAddReply}
      onWritingComment={onWritingComment}
      onEditComment={onEditComment}
      onVoteComment={onVoteComment}
    />
  </article>
);

export default CommentContainer;
