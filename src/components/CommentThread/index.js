import React from "react";
import { withRouter } from "next/router";
import CommentContainer from "@components/CommentContainer";
import data from "@data/data.json";
import styles from "./styles.module.css";

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: data.comments,
      currentUser: this.props.user,
    };
  }

  render() {
    return (
      <section className={styles["comments_section"]}>
        {this.state.comments.map((comment) => (
          <CommentContainer
            key={comment.id}
            id={comment.id}
            user={comment.user}
            currentUser={this.state.currentUser}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            replies={comment.replies}
          />
        ))}
      </section>
    );
  }
}

export default withRouter(CommentThread);
