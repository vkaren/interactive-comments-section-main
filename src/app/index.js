import React from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";
import { withRouter } from "next/router";
import data from "@data/data.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: data.comments,
      currentUser: this.props.user,
    };
  }

  render() {
    return (
      <>
        <CommentThread comments={data.comments} currentUser={this.props.user} />
        <AddComment />
      </>
    );
  }
}

export default withRouter(App);
