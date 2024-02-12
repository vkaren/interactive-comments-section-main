import { Component, createRef } from "react";
import { withRouter } from "next/router";
import { getData, setData } from "@utils/myLocalStorage";
import { getFormInputs } from "@utils/getFormInputs";
import Form from "@components/Form";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpError: "",
    };
    this.form = createRef();
  }

  componentDidMount() {
    this.users = getData("users");
  }

  onCreateAccount = (e) => {
    e.preventDefault();

    const { usernameInput, passwordInput } = getFormInputs(this.form.current);

    const canCreateAnAccount = this.validateForm({
      usernameInput,
      passwordInput,
    });

    if (canCreateAnAccount) {
      const user = {
        username: usernameInput,
        password: passwordInput,
        image: {
          png: "/avatars/avatar-default-user.png",
        },
        isLoggedIn: true,
        votedComments: [],
      };

      this.users.push(user);

      setData("users", this.users);

      this.props.router.push("/comments");
    }
  };

  validateForm = ({ usernameInput, passwordInput }) => {
    const allowedCharacters = /^([a-z0-9_])+$/i;
    const isUsernameAlreadyTaken = this.isUsernameAlreadyTaken(usernameInput);
    const isPasswordRightLength = passwordInput.length >= 5;

    if (
      allowedCharacters.test(usernameInput) &&
      allowedCharacters.test(passwordInput) &&
      !isUsernameAlreadyTaken &&
      isPasswordRightLength
    ) {
      this.setState({ signUpError: "" });
      return true;
    } else if (!usernameInput) {
      this.setState({
        signUpError: "Username required.",
      });
    } else if (!passwordInput) {
      this.setState({
        signUpError: "Password required.",
      });
    } else if (isUsernameAlreadyTaken) {
      this.setState({
        signUpError: "This username is already taken.",
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

  isUsernameAlreadyTaken = (username) => {
    return this.users.some((user) => user.username === username);
  };

  render() {
    return (
      <Form
        typeForm={"signUp"}
        title={"Sign up"}
        formRef={this.form}
        onSubmit={this.onCreateAccount}
        error={this.state.signUpError}
      />
    );
  }
}

export default withRouter(SignUp);
