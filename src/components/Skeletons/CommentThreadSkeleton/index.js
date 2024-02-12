import styles from "./styles.module.css";
import skeletonAnimation from "../skeleton.module.css";

const CommentThreadSkeleton = () => {
  const renderCommentSkeletons = () => {
    let commentSkeletons = [];
    let i = 0;

    while (i < 3) {
      commentSkeletons.push(
        <article
          key={`comments-skeleton-${i}`}
          className={styles["comments-skeleton"]}
        >
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
      );
      i++;
    }
    return commentSkeletons;
  };
  return (
    <section className={styles["comment_thread-skeleton"]}>
      {renderCommentSkeletons()}
    </section>
  );
};

export default CommentThreadSkeleton;
