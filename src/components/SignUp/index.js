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

    const createdUsers = JSON.parse(localStorage.getItem("users")) || [];
    const canCreateAnAccount = this.validateForm({
      username,
      password,
      createdUsers,
    });

    if (canCreateAnAccount) {
      const user = {
        username,
        password,
        isLoggedIn: true,
        image: {
          png: "/avatars/avatar-default-user.png",
        },
        votedComments: [],
      };
      createdUsers.push(user);

      const usersStorage = JSON.stringify(createdUsers);
      localStorage.setItem("users", usersStorage);

      this.props.router.push(
        {
          pathname: "/comments",
          query: { user },
        },
        "/comments"
      );
    }
  };

  validateForm = ({ username, password, createdUsers }) => {
    const regex = /^([a-z0-9_])+$/i;
    const isUsernameAlreadyTaken = this.isUsernameAlreadyTaken({
      createdUsers,
      username,
    });
    const isPasswordRightLength = password.length >= 5;

    if (
      regex.test(username) &&
      regex.test(password) &&
      !isUsernameAlreadyTaken &&
      isPasswordRightLength
    ) {
      this.setState({ signUpError: "" });
      return true;
    } else if (isUsernameAlreadyTaken) {
      this.setState({
        signUpError: "This username is already taken.",
      });
    } else if (username === "") {
      this.setState({
        signUpError: "Username required.",
      });
    } else if (password === "") {
      this.setState({
        signUpError: "Password required.",
      });
    } else if (!isPasswordRightLength) {
      this.setState({
        signUpError: "Password must be at least 5 characters long.",
      });
    } else {
      this.setState({
        signUpError:
          "Username and password can only contain underscores and alphanumeric characters.",
      });
    }
    return false;
  };

  isUsernameAlreadyTaken = ({ createdUsers, username }) => {
    return createdUsers.filter((user) => user.username === username).length > 0;
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
