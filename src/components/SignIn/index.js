import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const SignIn = () => {
  const router = useRouter();

  const logIn = (e) => {
    e.preventDefault();
    router.push("/comments");
  };

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
          className={styles["sign-in__form_submit"]}
          onClick={logIn}
          type="submit"
        >
          Log in
        </button>

        <span className={styles["sign-up__link"]}>
          Don't have an account?
          <Link href="/sign-up">
            <span>Create one</span>
          </Link>
        </span>
      </form>
    </section>
  );
};

export default SignIn;
