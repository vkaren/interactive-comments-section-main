import { Component, createRef } from "react";
import { withRouter } from "next/router";
import { getData, setData, getUser } from "@utils/myLocalStorage";
import { getFormInputs } from "@utils/getFormInputs";
import Form from "@components/Form";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryPasswordError: "",
    };
    this.form = createRef();
  }

  componentDidMount() {
    this.users = getData("users");
  }

  recoveryPassword = (e) => {
    e.preventDefault();

    const { usernameInput, passwordInput } = getFormInputs(this.form.current);
    const userStorage = getUser(usernameInput);

    const canRecoverPassword = this.validateForm({
      usernameInput,
      passwordInput,
      userStorage,
    });

    if (canRecoverPassword) {
      this.setNewPassword({
        username: userStorage.username,
        newPassword: passwordInput,
      });

      this.props.router.push("/comments");
    }
  };

  setNewPassword = ({ username, newPassword }) => {
    const users = this.users;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (user.username === username) {
        user.password = newPassword;
        user.isLoggedIn = true;
      }
    }

    setData("users", users);
  };

  validateForm = ({ usernameInput, passwordInput, userStorage }) => {
    const allowedCharacters = /^([a-z0-9_])+$/i;
    const isARightPassword = allowedCharacters.test(passwordInput);
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
      <Form
        typeForm={"forgotPassword"}
        title={"Forgot Password"}
        formRef={this.form}
        onSubmit={this.recoveryPassword}
        error={this.state.recoveryPasswordError}
      />
    );
  }
}

export default withRouter(ForgotPassword);
