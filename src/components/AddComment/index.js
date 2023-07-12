import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import avatar from "@avatars/image-juliusomo.png";

const AddComment = () => {
  return (
    <section className={styles["add-comment_section"]}>
      <div className={styles["add-comment_profile-photo"]}>
        <Image src={avatar} width={25} height={25} />
      </div>

      <textarea
        className={styles["add-comment_textarea"]}
        placeholder="Add a comment..."
      ></textarea>

      <button className={styles["add-comment_send-btn"]}>SEND</button>
    </section>
  );
};

export default AddComment;
