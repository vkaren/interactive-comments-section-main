import styles from "./styles.module.css";
import skeletonAnimation from "../skeleton.module.css";

const AddCommentSkeleton = () => (
  <section className={styles["add_comment-skeleton"]}>
    <div
      className={`${styles["add-comment_profile-photo"]} ${skeletonAnimation["skeleton-animation"]}`}
    ></div>

    <div
      className={`${styles["add-comment_textarea"]} ${skeletonAnimation["skeleton-animation"]}`}
    ></div>

    <div
      className={`${styles["add-comment_send-btn"]} ${skeletonAnimation["skeleton-animation"]}`}
    ></div>
  </section>
);

export default AddCommentSkeleton;
