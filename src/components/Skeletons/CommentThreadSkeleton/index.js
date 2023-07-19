import React from "react";
import styles from "./styles.module.css";
import skeletonAnimation from "../skeleton.module.css";

const CommentThreadSkeleton = () => (
  <section className={styles["comment_thread-skeleton"]}>
    <article className={styles["comments-skeleton"]}>
      <div className={styles["comments_header-skeleton"]}>
        <div
          className={`${styles["comments_header_profile-photo"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
        <div
          className={`${styles["comments_header_username"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
      </div>
      <div
        className={`${styles["comments_text-skeleton"]} ${skeletonAnimation["skeleton-animation"]}`}
      ></div>
    </article>
    <article className={styles["comments-skeleton"]}>
      <div className={styles["comments_header-skeleton"]}>
        <div
          className={`${styles["comments_header_profile-photo"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
        <div
          className={`${styles["comments_header_username"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
      </div>
      <div
        className={`${styles["comments_text-skeleton"]} ${skeletonAnimation["skeleton-animation"]}`}
      ></div>
    </article>
    <article className={styles["comments-skeleton"]}>
      <div className={styles["comments_header-skeleton"]}>
        <div
          className={`${styles["comments_header_profile-photo"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
        <div
          className={`${styles["comments_header_username"]} ${skeletonAnimation["skeleton-animation"]}`}
        ></div>
      </div>
      <div
        className={`${styles["comments_text-skeleton"]} ${skeletonAnimation["skeleton-animation"]}`}
      ></div>
    </article>
  </section>
);

export default CommentThreadSkeleton;
