import React, { createRef } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import styles from "./styles.module.css";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryPasswordError: "",
    };
    this.form = createRef();
  }

  recoveryPassword = (e) => {
    e.preventDefault();

    const form = new FormData(this.form.current);
    const usernameInput = form.get("username");
    const passwordInput = form.get("password");

    const userStorage = this.isUserCreated(usernameInput);

    const canRecoverPassword = this.validateForm({
      usernameInput,
      passwordInput,
      userStorage,
    });

    if (canRecoverPassword) {
      this.setNewPassword({ userStorage, passwordInput });
      // this.props.router.push("/comments");
    }
  };

  setNewPassword = ({ userStorage, passwordInput }) => {
    const users = JSON.parse(localStorage.getItem("users"));

    users.map((user) => {
      if (user.username === userStorage.username) {
        user.password = passwordInput;
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
  };

  isUserCreated = (username) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    return users.filter((user) => user.username === username)[0] || {};
  };

  validateForm = ({ usernameInput, passwordInput, userStorage }) => {
    const regex = /^([a-z0-9_])+$/i;
    const isARightPassword = regex.test(passwordInput);
    const isPasswordRightLength = passwordInput.length >= 5;

    if (
      userStorage.username === usernameInput &&
      isARightPassword &&
      isPasswordRightLength
    ) {
      this.setState({ recoveryPasswordError: "" });
      return true;
    }

    if (!usernameInput) {
      this.setState({ recoveryPasswordError: "Username required." });
    } else if (!passwordInput) {
      this.setState({ recoveryPasswordError: "Password required." });
    } else if (!userStorage.username) {
      this.setState({
        recoveryPasswordError: "This username has not been created.",
      });
    } else if (!isARightPassword) {
      this.setState({
        recoveryPasswordError:
          "Password can only contain underscores and alphanumeric characters.",
      });
    } else if (!isPasswordRightLength) {
      this.setState({
        recoveryPasswordError: "Password must be at least 5 characters long.",
      });
    }

    return false;
  };

  render() {
    return (
      <section className={styles["forgot-password"]}>
        <h2 className={styles["forgot-password__title"]}>Forgot password</h2>

        <form ref={this.form} className={styles["forgot-password__form"]}>
          <label
            htmlFor="username"
            className={styles["forgot-password__form_label"]}
          >
            <span className={styles["forgot-password__form_input-title"]}>
              Username
            </span>
            <input
              className={styles["forgot-password__form_input"]}
              id="username"
              name="username"
              type="text"
              placeholder="juliusomo"
              required
            />
          </label>

          <label
            htmlFor="password"
            className={styles["forgot-password__form_label"]}
          >
            <span className={styles["forgot-password__form_input-title"]}>
              New password
            </span>
            <input
              className={styles["forgot-password__form_input"]}
              id="password"
              name="password"
              type="password"
              placeholder="1234"
              minLength="5"
              required
            />
          </label>

          <span className={styles.error}>
            {this.state.recoveryPasswordError}
          </span>

          <button
            onClick={this.recoveryPassword}
            className={styles["forgot-password__form_submit"]}
            type="submit"
          >
            Continue
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(ForgotPassword);
