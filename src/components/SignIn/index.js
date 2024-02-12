import { Component, createRef } from "react";
import { withRouter } from "next/router";
import { getData, setData, getUser } from "@utils/myLocalStorage";
import { getFormInputs } from "@utils/getFormInputs";
import Form from "@components/Form";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: "",
    };
    this.form = createRef();
  }

  componentDidMount() {
    this.users = getData("users");
  }

  logIn = (e) => {
    e.preventDefault();

    const { usernameInput, passwordInput } = getFormInputs(this.form.current);
    const userStorage = getUser(usernameInput);

    const canLogin = this.validateForm({
      usernameInput,
      passwordInput,
      userStorage,
    });

    if (canLogin) {
      const users = this.users;

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username === userStorage.username) {
          user.isLoggedIn = true;
          break;
        }
      }

      setData("users", users);

      this.props.router.push("/comments");
    }
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
      this.setState({ loginError: "Username required." });
    } else if (!passwordInput) {
      this.setState({ loginError: "Password required." });
    } else if (!userStorage.username) {
      this.setState({ loginError: "This username has not been created." });
    } else if (userStorage.password !== passwordInput) {
      this.setState({ loginError: "Invalid password." });
    }

    return false;
  };

  render() {
    return (
      <Form
        typeForm="signIn"
        title="Log In"
        formRef={this.form}
        onSubmit={this.logIn}
        error={this.state.loginError}
      />
    );
  }
}

export default withRouter(SignIn);
