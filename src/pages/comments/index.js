import React from "react";
import Layout from "@components/Layout";
import CommentThread from "@components/CommentThread";
import { withRouter } from "next/router";
import FormSkeleton from "@components/FormSkeleton";

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.router.query.username,
      canAccess: false,
    };
  }

  componentDidMount() {
    if (this.state.user || this.isAnUserLoggedIn()) {
      this.setState({ canAccess: true });
    } else {
      this.props.router.push("/");
    }
  }

  isAnUserLoggedIn = () => {
    const usersStorage = JSON.parse(localStorage.getItem("users")) || [];
    const isAnUserLoggedIn = usersStorage.find(
      (userStorage) => userStorage.isLoggedIn
    );

    if (!this.state.user && isAnUserLoggedIn) {
      this.setState({ user: isAnUserLoggedIn.username });
    }

    return !!isAnUserLoggedIn;
  };

  render() {
    return (
      <Layout>
        {this.state.canAccess ? (
          <CommentThread user={this.state.user} />
        ) : (
          <FormSkeleton />
        )}
      </Layout>
    );
  }
}

export default withRouter(CommentsPage);
