import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const Form = ({ typeForm, title, formRef, onSubmit, error }) => (
  <section className={styles["form_section"]}>
    <h2 className={styles["form_section-title"]}>{title}</h2>

    <form ref={formRef} className={styles["form"]}>
      <label htmlFor="username" className={styles["form_label"]}>
        <span className={styles["form_input-title"]}>Username</span>
        <input
          className={styles["form_input"]}
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
        />
      </label>

      <label htmlFor="password" className={styles["form_label"]}>
        <span className={styles["form_input-title"]}>Password</span>
        <input
          className={styles["form_input"]}
          id="password"
          name="password"
          type="password"
          placeholder="*****"
          minLength="5"
          required
        />
        {typeForm === "signIn" && (
          <Link href="/forgot-password">
            <span className={styles["forgot-password__link"]}>
              Forgot password?
            </span>
          </Link>
        )}
      </label>

      <span className={styles.error}>{error}</span>

      <button
        onClick={onSubmit}
        className={styles["form_submit"]}
        type="submit"
        aria-label={title}
      >
        {typeForm === "signIn" ? "Log in" : "Continue"}
      </button>

      {typeForm === "signIn" && (
        <span className={styles["sign-up__link"]}>
          Don't have an account?
          <Link href="/sign-up">
            <span>Create one</span>
          </Link>
        </span>
      )}
    </form>
  </section>
);

export default Form;
