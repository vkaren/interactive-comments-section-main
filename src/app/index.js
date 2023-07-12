import React from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";
import { withRouter } from "next/router";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: JSON.parse(localStorage.getItem("comments")),
      currentUser: this.props.user,
    };
  }

  onAddComment = () => {};
  onEditComment = () => {};
  onDeleteComment = () => {};
  onLikeComment = () => {};

  render() {
    return (
      <>
        <CommentThread
          comments={this.state.comments}
          currentUser={this.props.user}
        />
        <AddComment />
      </>
    );
  }
}

export default withRouter(App);
