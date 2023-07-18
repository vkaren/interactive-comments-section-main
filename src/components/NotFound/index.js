import Image from "next/image";
import iconNotFound from "@icons/icon-404.png";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <section className={styles["not-found"]}>
      <Image src={iconNotFound} alt="Not found icon" width={50} height={50} />
      <h1>Page Not Found</h1>
    </section>
  );
};

export default NotFound;
