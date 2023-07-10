import React, { createRef } from "react";
import styles from "./styles.module.css";
import { withRouter } from "next/router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpError: "",
    };
    this.form = createRef();
  }

  onCreateAccount = (e) => {
    e.preventDefault();

    const form = new FormData(this.form.current);
    const username = form.get("username");
    const password = form.get("password");

    const canCreateAnAccount = this.validateForm({ username, password });

    if (canCreateAnAccount) {
      const user = { username, password };
      const userStorage = JSON.stringify(user);
      localStorage.setItem("user", userStorage);
      // this.props.router.push("/comments");
    }
  };

  validateForm = ({ username, password }) => {
    const regex = /^([a-z0-9_])+$/i;

    if (regex.test(username) && regex.test(password)) {
      this.setState({ signUpError: "" });
      return true;
    } else if (username === "") {
      this.setState({
        signUpError: "Username required",
      });
    } else if (password === "") {
      this.setState({
        signUpError: "Password required",
      });
    } else {
      this.setState({
        signUpError:
          "Username and password can only contain underscores and alphanumeric characters",
      });
    }
    return false;
  };

  render() {
    return (
      <section className={styles["sign-up"]}>
        <h2 className={styles["sign-up__title"]}>Sign up</h2>

        <form ref={this.form} className={styles["sign-up__form"]}>
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

          <span className={styles.error}>{this.state.signUpError}</span>

          <button
            className={styles["sign-up__form_submit"]}
            onClick={this.onCreateAccount}
            type="submit"
          >
            Continue
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(SignUp);
