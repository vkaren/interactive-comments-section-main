import React from "react";
import styles from "./styles.module.css";

const SignIn = () => {
  return (
    <section className={styles["sign-in"]}>
      <h2 className={styles["sign-in__title"]}>Log in</h2>

      <form className={styles["sign-in__form"]}>
        <label htmlFor="username">
          <span>Username</span>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="juliusomo"
          />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input id="password" name="password" type="text" placeholder="1234" />
        </label>

        <button className={styles["sign-in__form_submit"]} type="submit">
          Log in
        </button>

        <span className={styles["sign-up__link"]}>
          Don't have an account?
          <a href="#" target="_blank">
            Create one
          </a>
        </span>
      </form>
    </section>
  );
};

export default SignIn;
