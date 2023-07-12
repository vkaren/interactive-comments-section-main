import React from "react";
import Layout from "@components/Layout";
import FormSkeleton from "@components/FormSkeleton";
import App from "app";
import { withRouter } from "next/router";

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.router.query.username,
      canAccess: false,
    };
  }

  componentDidMount() {
    this.usersStorage = JSON.parse(localStorage.getItem("users")) || [];

    if (this.state.user || this.isAnUserLoggedIn()) {
      this.setState({ canAccess: true });
    } else {
      this.props.router.push("/");
    }
  }

  isAnUserLoggedIn = () => {
    const isAnUserLoggedIn = this.usersStorage.find(
      (userStorage) => userStorage.isLoggedIn
    );

    if (!this.state.user && isAnUserLoggedIn) {
      this.setState({ user: isAnUserLoggedIn.username });
    }

    return !!isAnUserLoggedIn;
  };

  logOut = () => {
    const users = this.usersStorage.map((user) => {
      if (user.username === this.state.user) {
        user.isLoggedIn = false;
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    this.props.router.push("/");
  };

  render() {
    return (
      <Layout logOut={this.logOut}>
        {this.state.canAccess ? (
          <App user={this.state.user} />
        ) : (
          <FormSkeleton />
        )}
      </Layout>
    );
  }
}

export default withRouter(CommentsPage);
