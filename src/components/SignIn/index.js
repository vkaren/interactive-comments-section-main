import React, { createRef } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import styles from "./styles.module.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: "",
    };
    this.form = createRef();
  }

  logIn = (e) => {
    e.preventDefault();

    const form = new FormData(this.form.current);
    const usernameInput = form.get("username");
    const passwordInput = form.get("password");

    const userStorage = this.isUserCreated();

    const canLogin = this.validateForm({
      usernameInput,
      passwordInput,
      userStorage,
    });

    if (canLogin) {
      // this.props.router.push("/comments");
    }
  };

  isUserCreated = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    return user;
  };

  validateForm = ({ usernameInput, passwordInput, userStorage }) => {
    if (
      userStorage.username === usernameInput &&
      userStorage.password === passwordInput
    ) {
      this.setState({ loginError: "" });
      return true;
    }

    if (!usernameInput) {
      this.setState({ loginError: "Username required" });
    } else if (!passwordInput) {
      this.setState({ loginError: "Password required" });
    } else if (!userStorage) {
      this.setState({ loginError: "Create an account" });
    } else if (userStorage.username !== usernameInput) {
      this.setState({ loginError: "This username has not been created" });
    } else if (userStorage.password !== passwordInput) {
      this.setState({ loginError: "Invalid password" });
    }

    return false;
  };

  render() {
    return (
      <section className={styles["sign-in"]}>
        <h2 className={styles["sign-in__title"]}>Log in</h2>

        <form ref={this.form} className={styles["sign-in__form"]}>
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

          <span className={styles.error}>{this.state.loginError}</span>

          <button
            onClick={this.logIn}
            className={styles["sign-in__form_submit"]}
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
  }
}

export default withRouter(SignIn);
