import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  const createAccount = (e) => {
    e.preventDefault();
    router.push("/comments");
  };

  return (
    <section className={styles["sign-up"]}>
      <h2 className={styles["sign-up__title"]}>Sign up</h2>

      <form className={styles["sign-up__form"]}>
        <label htmlFor="username">
          <span>Username</span>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="juliusomo"
            required
          />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="1234"
            minLength="5"
            required
          />
        </label>

        <button
          className={styles["sign-up__form_submit"]}
          onClick={createAccount}
          type="submit"
        >
          Continue
        </button>
      </form>
    </section>
  );
};

export default SignUp;
