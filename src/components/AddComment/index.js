import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const AddComment = ({
  currentUser,
  onWritingComment,
  onAddComment,
  onAddReply,
  replyComment = null,
}) => {
  const preventDefaultBehaviourEnter = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onAddCommentOrReply = () => {
    replyComment ? onAddReply(replyComment) : onAddComment();
  };

  return (
    <section
      className={`${styles["add-comment_section"]} ${
        replyComment && styles["add-comment_reply_section"]
      }`}
    >
      <div className={styles["add-comment_profile-photo"]}>
        <Image src={currentUser.image.png} width={25} height={25} />
      </div>

      <textarea
        className={styles["add-comment_textarea"]}
        placeholder="Add a comment..."
        onKeyDown={preventDefaultBehaviourEnter}
        onKeyUp={onWritingComment({ replyComment })}
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
