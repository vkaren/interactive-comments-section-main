import React from "react";
import App from "app";
import Layout from "@components/Layout";
import FormSkeleton from "@components/FormSkeleton";
import data from "@data/data.json";
import { getData, setData, isAnUserLoggedIn } from "@utils/myLocalStorage";
import { AppProvider } from "context";
import { withRouter } from "next/router";

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      canAccess: false,
    };
  }

  componentDidMount() {
    // Authenticating the page
    const userLoggedIn = isAnUserLoggedIn();

    if (userLoggedIn) {
      this.setState({ user: userLoggedIn, canAccess: true });
    } else {
      this.props.router.push("/");
    }

    // Saving the default comments in localstorage
    if (getData("comments").length === 0) {
      setData("comments", data.comments);
    }
  }

  logOut = () => {
    const users = getData("users");

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.username === this.state.user.username) {
        user.isLoggedIn = false;
        break;
      }
    }

    setData("users", users);
    this.props.router.push("/");
  };

  render() {
    return (
      <Layout logOut={this.logOut} canAccess={this.state.canAccess}>
        {this.state.canAccess ? (
          <AppProvider user={this.state.user}>
            <App />
          </AppProvider>
        ) : (
          <FormSkeleton />
        )}
      </Layout>
    );
  }
}

export default withRouter(CommentsPage);
