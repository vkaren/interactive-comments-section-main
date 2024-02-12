import { Component } from "react";
import { withRouter } from "next/router";
import { AppProvider } from "context";
import { getData, setData, isAnUserLoggedIn } from "@utils/myLocalStorage";
import App from "app";
import Layout from "@components/Layout";
import FormSkeleton from "@components/Skeletons/FormSkeleton";

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      canAccess: false,
    };
  }

  async componentDidMount() {
    // Authenticating the page
    const userLoggedIn = isAnUserLoggedIn();

    if (userLoggedIn) {
      // Saving the default comments in localstorage
      if (getData("comments").length === 0) {
        const data = await import("@data/data.json");
        const comments = data.comments;
        setData("comments", comments);
      }

      this.setState({ user: userLoggedIn, canAccess: true });
    } else {
      this.props.router.push("/");
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
