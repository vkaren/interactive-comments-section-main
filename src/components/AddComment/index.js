import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "context";
import styles from "./styles.module.css";

const AddComment = ({ replyComment = null }) => {
  const {
    currentUser,
    textarea,
    onAddReply,
    onAddComment,
    onWritingComment,
    preventDefaultBehaviourEnter,
  } = useContext(AppContext);

  const newReplyData = {
    type: "reply",
    replyComment,
  };

  const onAddCommentOrReply = () => {
    replyComment ? onAddReply(newReplyData) : onAddComment();
  };

  return (
    <section
      className={`${styles["add-comment_section"]} ${
        replyComment && styles["add-comment_reply_section"]
      }`}
    >
      <div className={styles["add-comment_profile-photo"]}>
        <Image
          src={currentUser.image.png}
          alt="User avatar"
          width={25}
          height={25}
        />
      </div>

      <textarea
        ref={textarea}
        className={styles["add-comment_textarea"]}
        placeholder="Add a comment..."
        onKeyDown={preventDefaultBehaviourEnter}
        onKeyUp={onWritingComment(replyComment ? newReplyData : null)}
      ></textarea>

      <button
        className={styles["add-comment_send-btn"]}
        onClick={onAddCommentOrReply}
      >
        {replyComment ? "REPLY" : "SEND"}
      </button>
    </section>
  );
};

export default AddComment;
